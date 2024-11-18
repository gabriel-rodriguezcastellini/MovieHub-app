import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

const SignOutButton = () => {
  const handleSignOut = async () => {
    await signOut(auth);
  };
  return (
    <button
      onClick={handleSignOut}
      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg transition duration-300"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
