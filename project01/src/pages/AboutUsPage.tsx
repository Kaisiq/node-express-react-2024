import { CheckIcon } from "lucide-react";
import { useLocation } from "react-router";
import CustomHead from "~/components/CustomHead";
import { AnimatedTooltip } from "~/components/ui/animated-tooltip";

export default function AboutUsPage() {
  const people = [
    {
      id: 1,
      name: "Даниел Иванов",
      designation: "4 курс, Информатика",
      image: "/cat.jpg",
    },
  ];
  const location = useLocation();
  return (
    <>
      <CustomHead
        title={`Две Трети | За Нас`}
        description={`Онлайн магазин за дрехи втора употреба`}
        image={`/b.webp?height=800&width=1600`}
        link={`${location.pathname}`}
        type="web"
        domain={`${location.pathname}`}
      />
      <main>
        <div className="w-full py-12">
          <div className="container px-4">
            <div className="flex flex-col items-center space-y-6">
              <h1 className="text-3xl font-bold tracking-tight">За нас</h1>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Две Трети е уеб платформа за препродаване на дрехи втора употреба.
              </p>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Дрехите са в перфектно качество, ако друго не е указано.
              </p>
            </div>
            <div className="mt-8 grid items-start gap-6 md:grid-cols-2">
              <div className="flex flex-col space-y-2">
                <h2 className="text-xl font-semibold tracking-tight">Our Mission</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  We believe in the power of the web to connect people and information. Our mission
                  is to make web development more accessible, efficient, and delightful for
                  everyone.
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <h2 className="text-xl font-semibold tracking-tight">Използвани технологии</h2>
                <ul className="grid grid-cols-1 gap-4 text-gray-500 dark:text-gray-400 md:grid-cols-2">
                  <li className="flex space-x-2">
                    <CheckIcon className="h-4 w-4 text-blue-600" />
                    <span>Create React App(w/ Typescript)</span>
                  </li>
                  <li className="flex space-x-2">
                    <CheckIcon className="h-4 w-4 text-blue-600" />
                    <span>ExpressJS, PassportJS JWT</span>
                  </li>
                  <li className="flex space-x-2">
                    <CheckIcon className="h-4 w-4 text-blue-600" />
                    <span>zod, axios, bcrypt</span>
                  </li>
                  <li className="flex space-x-2">
                    <CheckIcon className="h-4 w-4 text-blue-600" />
                    <span>react-router</span>
                  </li>
                  <li className="flex space-x-2">
                    <CheckIcon className="h-4 w-4 text-blue-600" />
                    <span>UploadThing</span>
                  </li>
                  <li className="flex space-x-2">
                    <CheckIcon className="h-4 w-4 text-blue-600" />
                    <span>MongoDB, Mongoose</span>
                  </li>
                  <li className="flex space-x-2">
                    <CheckIcon className="h-4 w-4 text-blue-600" />
                    <span>TailwindCSS, shadcnUI</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 grid items-start gap-6 md:grid-cols-2">
              <div className="flex flex-col space-y-2">
                <h2 className="text-xl font-semibold tracking-tight">Meet the Team</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  We are a diverse team of designers, developers, and dreamers who share a common
                  goal: to push the boundaries of what is possible on the web.
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <h2 className="text-xl font-semibold tracking-tight">Achievements</h2>
                <ul className="list-disc pl-4 text-gray-500 dark:text-gray-400">
                  <li>Launched the #1 platform for frontend developers</li>
                  <li>Featured in TechCrunch for our innovative approach to web development</li>
                  <li>Reached over 1 million users in our first year</li>
                </ul>
              </div>
            </div>
            <div className="mb-10 flex w-full flex-row items-center justify-center">
              <AnimatedTooltip items={people} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
