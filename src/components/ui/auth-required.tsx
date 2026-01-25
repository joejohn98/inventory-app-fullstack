import { ShieldAlert } from "lucide-react";
import Link from "next/link";

interface AuthRequiredProps {
  resourceName?: string;
  showSignInLink?: boolean;
}

const AuthRequired = ({
  resourceName = "this page",
  showSignInLink = true,
}: AuthRequiredProps) => {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
      <div className="flex items-start space-x-3">
        <ShieldAlert className="w-6 h-6 text-yellow-600 shrink-0 mt-0.5" />
        <div>
          <h2 className="text-xl font-bold text-yellow-800">
            Authentication Required
          </h2>
          <p className="text-yellow-600 mt-2">
            Please sign in to view {resourceName}.
          </p>
          {showSignInLink && (
            <Link
              href="/sign-in"
              className="inline-flex items-center mt-4 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthRequired;
