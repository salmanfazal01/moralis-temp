import { firebaseAdmin } from "@config/firebaseAdmin";
import nookies from "nookies";
// gssp = data coming from the serversideprops

// try {
//   if (!admin.apps.length) {
//     admin.initializeApp(firebaseConfig);
//   }
// } catch (e) {
//   console.log(e);
// }

// Return only admin firestore
export function withAdminDb(gssp) {
  return async (context) => {
    const gsspData = gssp
      ? await gssp(context, { db: firebaseAdmin.firestore() })
      : { props: {} };

    if (gsspData.redirect) {
      return gsspData;
    }

    return {
      props: {
        ...gsspData.props,
      },
    };
  };
}

// Returns user if signed in
export function withUser(gssp, options = {}) {
  const { hideIfUserExists } = options;

  return async (context) => {
    const { isLoggedIn, profile: _profile, user: _user } = nookies.get(context);

    const profile =
      _profile && _profile != "undefined"
        ? JSON?.parse?.(_profile || "")
        : null;
    const user =
      _user && _user != "undefined" ? JSON?.parse?.(_user || "") : null;

    if (isLoggedIn == "true" && hideIfUserExists) {
      return {
        redirect: {
          destination: "/",
        },
      };
    }

    const gsspData = gssp
      ? await gssp(context, { user, profile, db: firebaseAdmin.firestore() })
      : { props: {} };

    if (gsspData.redirect) {
      return gsspData;
    }

    return {
      props: {
        ...gsspData.props,
        user: user ? user : null,
        profile: profile ? profile : null,
      },
    };
  };
}

// Protects user only if signed in and is granted permission
export function withProtectedUser(gssp, options = {}) {
  const { trustLevel } = options;

  return async (context) => {
    const {
      isLoggedIn,
      profile: _profile,
      user: _user,
      token,
    } = nookies.get(context);

    const authUser = await firebaseAdmin
      .auth()
      .verifyIdToken(token)
      .catch((err) => {
        console.log(err);
        return {
          redirect: {
            destination: "/signout",
          },
        };
      });

    if (!authUser?.uid && isLoggedIn !== "true") {
      return {
        redirect: {
          destination: "/signout",
        },
      };
    }

    const profile =
      _profile && _profile != "undefined"
        ? JSON?.parse?.(_profile || "")
        : null;
    const user =
      _user && _user != "undefined" ? JSON?.parse?.(_user || "") : null;

    if (isLoggedIn !== "true") {
      return {
        redirect: {
          destination: "/login",
        },
      };
    }

    const gsspData = gssp
      ? await gssp(context, { user, profile, db: firebaseAdmin.firestore() })
      : { props: {} };

    const { trustLevel: userTrustLevel } = user;

    if (!!trustLevel && userTrustLevel < trustLevel) {
      return {
        redirect: {
          destination: "/",
        },
      };
    }

    if (gsspData.redirect) {
      return gsspData;
    }

    return {
      props: {
        ...gsspData.props,
        user: user ? user : null,
        profile: profile ? profile : null,
      },
    };
  };
}
