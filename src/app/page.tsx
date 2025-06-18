import Cta from "@/components/Cta";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div>
      <div className="container mx-auto">
        <Navbar />
        <section className="grid grid-cols-1 lg:grid-cols-3 mt-16 max-md:mt-8 text-slate-800">
          <div className="flex flex-col lg:col-span-2">
            <h1 className="text-5xl font-bold max-md:text-center">
              AI-powered chatbot for your business.
            </h1>
            <ul className="list-inside list-disc max-md:ms-2">
              <li className="mt-6 ms-4 text-2xl">
                Implement AI in your websites.
              </li>
              <li className="mt-6 ms-4 text-2xl">Using AI for tasks, stub.</li>
              <li className="mt-6 ms-4 text-2xl">
                Make an AI bot can guide your client.
              </li>
              <li className="mt-6 ms-4 text-2xl">
                Serve your jobs and more...
              </li>
            </ul>
            <div className="mt-16 max-md:mt-12 max-md:text-center">
              <button className="btn btn-gradient">
                ➡️ Get started for free
              </button>
            </div>
          </div>
          <div className="max-md:my-4">
            <Cta />
          </div>
        </section>
        <div className="grid grid-cols-2"></div>
      </div>
    </div>
  );
}
