import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { CaelumRegistry } from "../target/types/caelum_registry";
import { assert, expect } from "chai";

describe("CaelumX Carbon Credit Registry", () => {
  // Configure the client to use the local cluster
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.CaelumRegistry as Program<CaelumRegistry>;
  
  // Project Status enum based on IDL
  enum ProjectStatus {
    Available = "available",
    Traded = "traded",
    Retired = "retired"
  }

  describe("Project Addition", () => {
    it("Should add a new carbon credit project", async () => {
      // Generate a new keypair for the registry account
      const registryAccount = anchor.web3.Keypair.generate();
      
      // Prepare project details
      const projectName = "Amazon Reforestation";
      const projectType = "Reforestation";
      const region = "Brazil";
      const vintageYear = 2023;
      const certificationBody = "Gold Standard";
      const creditAmount = new anchor.BN(1000);
      const ipfsHash = "QmExampleIPFSHash";

      // Create the registry account
      await program.methods
        .initializeRegistry()
        .accountsPartial({
          registryAccount: registryAccount.publicKey,
          authority: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([registryAccount])
        .rpc();

      // Prepare verifier
      const verifier = provider.wallet.publicKey;

      // Add project
      await program.methods
        .addProject(
          projectName,
          projectType,
          region,
          vintageYear,
          certificationBody,
          creditAmount,
          ipfsHash
        )
        .accountsPartial({
          registryAccount: registryAccount.publicKey,
          verifier: verifier,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc();

      // Fetch and verify the registry account
      const registryState = await program.account.registryAccount.fetch(registryAccount.publicKey);
      
      expect(registryState.projects.length).to.equal(1);
      const addedProject = registryState.projects[0];
      
      expect(addedProject.name).to.equal(projectName);
      expect(addedProject.projectType).to.equal(projectType);
      expect(addedProject.region).to.equal(region);
      expect(addedProject.vintageYear).to.equal(vintageYear);
      expect(addedProject.certificationBody).to.equal(certificationBody);
      expect(addedProject.creditAmount.toString()).to.equal(creditAmount.toString());
      expect(addedProject.ipfsHash).to.equal(ipfsHash);
      expect(addedProject.status).to.deep.equal({ available: {} });
    });

    it("Should fail to add project with invalid parameters", async () => {
      // Generate a new keypair for the registry account
      const registryAccount = anchor.web3.Keypair.generate();
      
      // Create the registry account
      await program.methods
        .initializeRegistry()
        .accounts({
          registryAccount: registryAccount.publicKey,
          authority: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([registryAccount])
        .rpc();

      const verifier = provider.wallet.publicKey;

      try {
        await program.methods
          .addProject(
            "", // Empty project name (should fail)
            "Reforestation",
            "Brazil",
            2023,
            "Gold Standard",
            new anchor.BN(0), // Zero credit amount (should fail)
            "QmExampleIPFSHash"
          )
          .accounts({
            registryAccount: registryAccount.publicKey,
            verifier: verifier,
            systemProgram: anchor.web3.SystemProgram.programId,
          })
          .rpc();
        
        expect.fail("Should have thrown an error");
      } catch (error) {
        expect(error.message).to.include("Invalid project name");
      }
    });
  });

  describe("Project Verification", () => {
    it("Should verify a project", async () => {
      // Generate a new keypair for the registry account
      const registryAccount = anchor.web3.Keypair.generate();
      
      // Create the registry account
      await program.methods
      .initializeRegistry()
      .accounts({
          registryAccount: registryAccount.publicKey,
          authority: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([registryAccount])
        .rpc();

      const verifier = provider.wallet.publicKey;

      // Derive the verifier PDA
      const [verifierPda] = anchor.web3.PublicKey.findProgramAddressSync(
        [
          Buffer.from("verifier"),
          verifier.toBuffer()
        ],
        program.programId
      );

      // First add a project
      await program.methods
        .addProject(
          "Amazon Reforestation",
          "Reforestation",
          "Brazil",
          2023,
          "Gold Standard",
          new anchor.BN(1000),
          "QmExampleIPFSHash"
        )
        .accounts({
          registryAccount: registryAccount.publicKey,
          verifier: verifier,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc();

      // Then verify the project
      await program.methods
        .verifyProject(0) // First project index
        .accountsPartial({
          registryAccount: registryAccount.publicKey,
          verifierAccount: verifierPda,
          verifier: verifier,
        })
        .rpc();

      // Fetch the updated registry state
      const registryState = await program.account.registryAccount.fetch(registryAccount.publicKey);
      
      expect(registryState.projects[0].verifier).to.deep.equal(verifier);
    });
  });

  describe("Credit Status Update", () => {
    it("Should update project status from Available to Traded", async () => {
      // Generate a new keypair for the registry account
      const registryAccount = anchor.web3.Keypair.generate();
      
      // Create the registry account
      await program.methods
      .initializeRegistry()
      .accounts({
          registryAccount: registryAccount.publicKey,
          authority: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([registryAccount])
        .rpc();

      const verifier = provider.wallet.publicKey;

      // Add a project
      await program.methods
        .addProject(
          "Amazon Reforestation",
          "Reforestation",
          "Brazil",
          2023,
          "Gold Standard",
          new anchor.BN(1000),
          "QmExampleIPFSHash"
        )
        .accounts({
          registryAccount: registryAccount.publicKey,
          verifier: verifier,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc();

      // Update status to Traded
      await program.methods
        .updateCreditStatus(
          0, 
          { traded: {} }
        )
        .accounts({
          registryAccount: registryAccount.publicKey,
          authority: provider.wallet.publicKey,
        })
        .rpc();

      // Fetch the updated registry state
      const registryState = await program.account.registryAccount.fetch(registryAccount.publicKey);
      
      expect(registryState.projects[0].status).to.deep.equal({ traded: {} });
    });
    it("Should fail invalid status transition", async () => {
      const registryAccount = anchor.web3.Keypair.generate();
   
      // Initialize registry
      await program.methods
        .initializeRegistry()
        .accounts({
          registryAccount: registryAccount.publicKey,
          authority: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([registryAccount])
        .rpc();
   
      const verifier = provider.wallet.publicKey;
   
      // Add a project
      await program.methods
        .addProject(
          "Amazon Reforestation",
          "Reforestation",
          "Brazil",
          2023,
          "Gold Standard",
          new anchor.BN(1000),
          "QmExampleIPFSHash"
        )
        .accounts({
          registryAccount: registryAccount.publicKey,
          verifier: verifier,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc();
   
      try {
        // Try invalid transition from Available to Retired
        await program.methods
          .updateCreditStatus(0, { retired: {} })
          .accounts({
            registryAccount: registryAccount.publicKey,
            authority: provider.wallet.publicKey,
          })
          .rpc();
   
        // If no error is thrown, the test should fail
        assert.fail("Expected error: Invalid status transition");
      } catch (error) {
        // Ensure the error is correctly thrown
        assert(error.message.includes("Invalid status transition"), error.message);
      }
   });
   
  });
});