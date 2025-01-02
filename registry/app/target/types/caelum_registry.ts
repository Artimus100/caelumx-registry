/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/caelum_registry.json`.
 */
export type CaelumRegistry = {
  "address": "2mg8v3Nxu1yzjjHbhX84jiSkfX2jBZcojTP4hgyNeLGa",
  "metadata": {
    "name": "caelumRegistry",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "addProject",
      "discriminator": [
        97,
        192,
        178,
        11,
        126,
        16,
        196,
        5
      ],
      "accounts": [
        {
          "name": "registryAccount",
          "writable": true
        },
        {
          "name": "verifier",
          "writable": true,
          "signer": true
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "projectType",
          "type": "string"
        },
        {
          "name": "region",
          "type": "string"
        },
        {
          "name": "vintageYear",
          "type": "u16"
        },
        {
          "name": "certificationBody",
          "type": "string"
        },
        {
          "name": "creditAmount",
          "type": "u64"
        },
        {
          "name": "ipfsHash",
          "type": "string"
        }
      ]
    },
    {
      "name": "initializeRegistry",
      "discriminator": [
        189,
        181,
        20,
        17,
        174,
        57,
        249,
        59
      ],
      "accounts": [
        {
          "name": "registryAccount",
          "writable": true,
          "signer": true
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "updateCreditStatus",
      "discriminator": [
        123,
        91,
        69,
        184,
        177,
        147,
        96,
        198
      ],
      "accounts": [
        {
          "name": "registryAccount",
          "writable": true
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        }
      ],
      "args": [
        {
          "name": "projectIndex",
          "type": "u32"
        },
        {
          "name": "newStatus",
          "type": {
            "defined": {
              "name": "projectStatus"
            }
          }
        }
      ]
    },
    {
      "name": "verifyProject",
      "discriminator": [
        185,
        69,
        182,
        89,
        5,
        45,
        19,
        179
      ],
      "accounts": [
        {
          "name": "registryAccount",
          "writable": true
        },
        {
          "name": "verifier",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "projectIndex",
          "type": "u32"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "registryAccount",
      "discriminator": [
        113,
        93,
        106,
        201,
        100,
        166,
        146,
        98
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "invalidProjectName",
      "msg": "Invalid project name"
    },
    {
      "code": 6001,
      "name": "invalidCreditAmount",
      "msg": "Invalid credit amount"
    },
    {
      "code": 6002,
      "name": "invalidIpfsHash",
      "msg": "Invalid IPFS hash"
    },
    {
      "code": 6003,
      "name": "invalidStatusTransition",
      "msg": "Invalid status transition"
    },
    {
      "code": 6004,
      "name": "projectNotFound",
      "msg": "Project not found"
    }
  ],
  "types": [
    {
      "name": "carbonProject",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "projectType",
            "type": "string"
          },
          {
            "name": "region",
            "type": "string"
          },
          {
            "name": "vintageYear",
            "type": "u16"
          },
          {
            "name": "certificationBody",
            "type": "string"
          },
          {
            "name": "verifier",
            "type": "pubkey"
          },
          {
            "name": "creditAmount",
            "type": "u64"
          },
          {
            "name": "status",
            "type": {
              "defined": {
                "name": "projectStatus"
              }
            }
          },
          {
            "name": "ipfsHash",
            "type": "string"
          },
          {
            "name": "mintAddress",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "projectStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "available"
          },
          {
            "name": "traded"
          },
          {
            "name": "retired"
          }
        ]
      }
    },
    {
      "name": "registryAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "projects",
            "type": {
              "vec": {
                "defined": {
                  "name": "carbonProject"
                }
              }
            }
          },
          {
            "name": "authority",
            "type": "pubkey"
          }
        ]
      }
    }
  ]
};
