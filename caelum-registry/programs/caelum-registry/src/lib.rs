use anchor_lang::prelude::*;

declare_id!("2mg8v3Nxu1yzjjHbhX84jiSkfX2jBZcojTP4hgyNeLGa");

#[program]
pub mod caelum_registry {
    use super::*;

    pub fn initialize_registry(ctx: Context<InitializeRegistry>) -> Result<()> {
        let registry = &mut ctx.accounts.registry_account;
        registry.projects = Vec::new();
        registry.authority = ctx.accounts.authority.key();
        Ok(())
    }

    pub fn add_project(
        ctx: Context<AddProject>,
        name: String,
        project_type: String,
        region: String,
        vintage_year: u16,
        certification_body: String,
        credit_amount: u64,
        ipfs_hash: String,
    ) -> Result<()> {
        require!(!name.is_empty(), ErrorCode::InvalidProjectName);
        require!(credit_amount > 0, ErrorCode::InvalidCreditAmount);
        require!(!ipfs_hash.is_empty(), ErrorCode::InvalidIPFSHash);

        let registry = &mut ctx.accounts.registry_account;
        registry.projects.push(CarbonProject {
            name,
            project_type,
            region,
            vintage_year,
            certification_body,
            verifier: Pubkey::default(),
            credit_amount,
            status: ProjectStatus::Available,
            ipfs_hash,
            mint_address: ctx.accounts.verifier.key(),
        });

        Ok(())
    }

    pub fn verify_project(ctx: Context<VerifyProject>, project_index: u32) -> Result<()> {
        let registry = &mut ctx.accounts.registry_account;
        let project = registry.projects.get_mut(project_index as usize).ok_or(ErrorCode::ProjectNotFound)?;
        project.verifier = ctx.accounts.verifier.key();
        Ok(())
    }

    pub fn update_credit_status(
        ctx: Context<UpdateCreditStatus>,
        project_index: u32,
        new_status: ProjectStatus,
    ) -> Result<()> {
        let registry = &mut ctx.accounts.registry_account;
        let project = registry.projects.get_mut(project_index as usize).ok_or(ErrorCode::ProjectNotFound)?;

        match (&project.status, &new_status) {
            (ProjectStatus::Available, ProjectStatus::Traded) |
            (ProjectStatus::Available, ProjectStatus::Retired) => {
                project.status = new_status;
            }
            _ => return Err(ErrorCode::InvalidStatusTransition.into()),
        }

        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeRegistry<'info> {
    #[account(init, payer = authority, space = 1024)]
    pub registry_account: Account<'info, RegistryAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AddProject<'info> {
    #[account(mut)]
    pub registry_account: Account<'info, RegistryAccount>,
    #[account(mut)]
    pub verifier: Signer<'info>,
}

#[derive(Accounts)]
pub struct VerifyProject<'info> {
    #[account(mut)]
    pub registry_account: Account<'info, RegistryAccount>,
    pub verifier: Signer<'info>,
}

#[derive(Accounts)]
pub struct UpdateCreditStatus<'info> {
    #[account(mut)]
    pub registry_account: Account<'info, RegistryAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
}

#[account]
pub struct RegistryAccount {
    pub projects: Vec<CarbonProject>,
    pub authority: Pubkey,
}

#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct CarbonProject {
    pub name: String,
    pub project_type: String,
    pub region: String,
    pub vintage_year: u16,
    pub certification_body: String,
    pub verifier: Pubkey,
    pub credit_amount: u64,
    pub status: ProjectStatus,
    pub ipfs_hash: String,
    pub mint_address: Pubkey,

}

#[derive(Clone, AnchorSerialize, AnchorDeserialize, PartialEq)]
pub enum ProjectStatus {
    Available,
    Traded,
    Retired,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Invalid project name")]
    InvalidProjectName,
    #[msg("Invalid credit amount")]
    InvalidCreditAmount,
    #[msg("Invalid IPFS hash")]
    InvalidIPFSHash,
    #[msg("Invalid status transition")]
    InvalidStatusTransition,
    #[msg("Project not found")]
    ProjectNotFound,
}
