import { ConnectButton } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import React, { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useAppSelector } from "@hooks/useRedux";
import { getUserWithEmail } from "@lib/user";
import { handleWalletRegister } from "@lib/auth";

const Register = () => {
  const [exists, setExists] = useState(false);

  const { user } = useAppSelector((state) => state.user);

  const { status, address, isConnected } = useAccount();

  const handleRegister = async () => {
    const _found = await getUserWithEmail(`${address}@makerdao.academy`);

    if (!_found) {
      const res = await handleWalletRegister(address);
    }
  };

  useEffect(() => {
    if (status === "connected" && isConnected) {
      handleRegister();
    }
  }, [status, isConnected]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ConnectButton />
    </div>
  );
};

export default Register;
