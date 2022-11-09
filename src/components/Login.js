import Image from "next/image";
import { useMoralis } from "react-moralis";
import Moralis from "moralis-v1";
import { useState } from "react";

const Login = () => {
  const { authenticate, enableWeb3 } = useMoralis();
  const [authError, setAuthError] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleAuth = async (provider) => {
    try {
      setAuthError(null);
      setIsAuthenticating(true);

      // Enable web3 to get user address and chain
      await enableWeb3({ throwOnError: true, provider });
      const { account, chainId } = Moralis;

      if (!account) {
        throw new Error(
          "Connecting to chain failed, as no connected account was found"
        );
      }
      if (!chainId) {
        throw new Error(
          "Connecting to chain failed, as no connected chain was found"
        );
      }

      // Get message to sign from the auth api
      const { message } = await Moralis.Cloud.run("requestMessage", {
        address: account,
        chain: parseInt(chainId, 16),
        network: "evm",
      });

      // Authenticate and login via parse
      await authenticate({
        signingMessage: message,
        throwOnError: true,
      });
    } catch (error) {
      setAuthError(error);
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="bg-black relative">
      <p>{String(authError)}</p>
      <h1>Login</h1>
      <div className="flex flex-col absolute z-50 h-4/6 items-center justify-center w-full space-y-4">
        <button
          onClick={() => handleAuth("metamask")}
          disabled={isAuthenticating}
          className="bg-yellow-500 rounded-lg p-5 font-bold animate-pulse"
        >
          Login
        </button>
      </div>
      <div className="w-full h-screen">
        <Image
          alt=""
          objectFit="cover"
          layout="fill"
          src="https://links.papareact.com/55n"
        />
      </div>
    </div>
  );
};

export default Login;
