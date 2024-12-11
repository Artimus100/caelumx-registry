use anchor_lang::prelude::*;

declare_id!("2mg8v3Nxu1yzjjHbhX84jiSkfX2jBZcojTP4hgyNeLGa");

#[program]
pub mod caelum_registry {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
