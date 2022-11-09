import { auth, providerGoogle } from "@config/firebase";

import {
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { updateUser } from "./user";

export const handleGoogleLogin = async () => {
  try {
    const res = await signInWithPopup(auth, providerGoogle);

    const details = getAdditionalUserInfo(res);

    return { success: true, user: res.user, isNewUser: details.isNewUser };
  } catch (error) {
    throw { error: true, message: error.message };
  }
};

export const handleLogin = async (email, password) => {
  try {
    if (!email && !password) throw { error: true, message: error.message };

    const res = await signInWithEmailAndPassword(auth, email, password);

    return { success: true, user: res.user };
  } catch (error) {
    throw { error: true, message: error.message };
  }
};

export const handleRegister = async (firstName, lastName, email, password) => {
  try {
    if (!firstName && !lastName && !email && !password)
      throw { error: true, message: "Missing Fields" };

    const displayName = `${firstName} ${lastName}`.trim();

    const res = await createUserWithEmailAndPassword(auth, email, password);

    if (res.user) {
      await updateProfile(res.user, {
        displayName,
      });

      await updateUser(res.user.uid, {
        firstName,
        lastName,
        displayName,
      });

      await sendUserEmailVerification(res.user);
    } else {
      throw new Error();
    }

    return { success: true, user: res.user };
  } catch (error) {
    throw { error: true, message: error.message };
  }
};

export const handleWalletRegister = async (address) => {
  try {
    if (!address) throw { error: true, message: "Missing Fields" };

    const email = `${address}@makerdao.academy`;
    const firstName = "Wallet";
    const lastName = "User";
    const displayName = "Wallet User";
    const password = "Password123.";

    const res = await createUserWithEmailAndPassword(auth, email, password);

    if (res.user) {
      await updateProfile(res.user, {
        displayName,
      });

      await updateUser(res.user.uid, {
        firstName,
        lastName,
        displayName,
      });
    } else {
      throw new Error();
    }

    return { success: true, user: res.user };
  } catch (error) {
    console.log(error);
    throw { error: true, message: error.message };
  }
};

export const handleSignOut = async () => {
  try {
    await signOut(auth).then(() => (window.location.href = "/"));
  } catch (error) {
    throw { error: true, message: error.message };
  }
};

export const emailPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);

    return { success: true };
  } catch (error) {
    console.log(error);
  }
};

export const sendUserEmailVerification = async () => {
  try {
    sendEmailVerification(auth.currentUser);

    return { success: true };
  } catch (error) {
    console.log(error);
  }
};
