module my_addr::ssscoin {
    use supra_framework::coin;
    use std::signer;
    use std::string;

    struct SSSCoin has key {}
    struct MintCap has key {
        cap: coin::MintCapability<SSSCoin>,
    }
    public entry fun initialize_my_token(account: &signer) {
    let (burn_cap, freeze_cap, mint_cap) = coin::initialize<SSSCoin>(
        account,
        string::utf8(b"SupraStudentS"), // Token name
        string::utf8(b"SSS"),                 // Token symbol
        8,                                   // Number of decimals
        true                                 // Monitor supply
    );

    // Destroy burn and freeze capabilities since they are not needed
    coin::destroy_burn_cap(burn_cap);
    coin::destroy_freeze_cap(freeze_cap);

    // Store mint_cap in the account so it can be used later for minting
    move_to(account, MintCap { cap: mint_cap });
}

}
