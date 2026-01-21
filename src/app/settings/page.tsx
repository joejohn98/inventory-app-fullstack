import Sidebar from "@/components/sidebar";
import SettingsForm from "@/components/settings-form";
import { getUserSession } from "@/lib/session";
import { Settings } from "lucide-react";
import Image from "next/image";

const SettingsPage = async () => {
  const session = await getUserSession();

  if (!session?.user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar currentPath="/settings" />
        <main className="ml-64 p-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-yellow-800">
              Authentication Required
            </h2>
            <p className="text-yellow-600 mt-2">
              Please sign in to view settings.
            </p>
          </div>
        </main>
      </div>
    );
  }

  const user = session.user;

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath="/settings" />

      <main className="ml-64 p-4 md:p-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Settings className="w-6 h-6 text-purple-600" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
              Settings
            </h1>
          </div>
          <p className="text-slate-600 ml-12">
            Manage your account settings and preferences
          </p>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Left Sidebar - User Profile Summary */}
          <aside className="xl:col-span-1 space-y-6">
            {/* User Profile Card */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                Profile
              </h3>

              {/* Profile Avatar */}
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full bg-linear-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white text-2xl font-bold mb-3 shadow-lg">
                  {user.image ? (
                    <Image
                      src={user.image}
                      width={40}
                      height={40}
                      alt={user.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    user.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()
                  )}
                </div>
                <h4 className="text-base font-semibold text-gray-900 text-center">
                  {user.name}
                </h4>
                <p className="text-sm text-gray-500 text-center break-all">
                  {user.email}
                </p>
              </div>

              {/* Quick Stats */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">Status</p>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></div>
                    <p className="text-xs font-medium text-gray-900">Active</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">Verified</p>
                  <p className="text-xs font-medium text-gray-900">
                    {user.emailVerified ? "Yes" : "No"}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">Joined</p>
                  <p className="text-xs font-medium text-gray-900">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Account Details Card */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                Account Details
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">User ID</p>
                  <p className="text-xs font-mono font-medium text-gray-900 bg-gray-50 px-2 py-1.5 rounded border border-gray-200">
                    {user.id.substring(0, 12)}...
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Created</p>
                  <p className="text-xs font-medium text-gray-900">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Last Updated</p>
                  <p className="text-xs font-medium text-gray-900">
                    {new Date(user.updatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content - Settings Form */}
          <main className="xl:col-span-3">
            <SettingsForm
              user={{
                name: user.name,
                email: user.email,
                image: user.image ?? null,
              }}
            />
          </main>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
