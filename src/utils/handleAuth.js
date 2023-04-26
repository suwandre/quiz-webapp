/**
 * @dev `handleAuth` handles the wallet authentication from Metamask or any similar providers.
 * This is required (compared to only using `authenticate`) as Moralis has a new version of authenticating.
 */
const handleAuth = async (
    setAuthError,
    setIsAuthenticating,
    enableWeb3,
    Moralis,
    authenticate,
    provider
) => {
    try {
        setAuthError(null);
        setIsAuthenticating(true);

        // enable web3 to get user address and chain
        await enableWeb3({ throwOnError: true, provider });
        const { account, chainId } = Moralis;

        if (!account) {
            throw new Error('Connecting to chain failed as no connected account was found.');
        }
    
          if (!chainId) {
            throw new Error('Connecting to chain failed as no connected chain was found.');
        }

        // get message to sign from auth api
        const { message } = await Moralis.Cloud.run('requestMessage', {
            address: account,
            chain: parseInt(chainId, 16),
            network: 'evm',
        });

        // authenticate and login via parse
        await authenticate({
            signingMessage: message,
            throwOnError: true,
        });
    } catch (err) {
        setAuthError(err);
    } finally {
        setIsAuthenticating(false);
    }
}

export default handleAuth;