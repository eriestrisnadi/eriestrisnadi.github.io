import MainLayout from "@/app/(main)/layout";
import NavigationHeader from "@/app/(main)/@navigation/default";

export default function Page() {
  return (
    <MainLayout navigation={<NavigationHeader />}>
      <div className="container flex-1 flex items-center justify-center">
        <div>
          <h1 className="inline-block mr-5 pr-6 text-2xl font-medium align-top border-r border-current">
            404
          </h1>
          <div className="inline-block">
            <h2 className="text-sm leading-8">This page could not be found.</h2>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
