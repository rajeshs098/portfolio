'use client'
import { Mail as EnvelopeIcon, GithubIcon, LinkedinIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { useEffect, useState } from "react"
import { Menu as HamburgerIcon } from 'lucide-react'; // Import Hamburger icon

import { Button } from "@/components/ui/button"
import AnimatedLink from "@/components/ui/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
}

interface PortfolioData {
  name: string;
  profile:string
  title: string;
  about: string;
  projects: Project[];
  skills: string[];
  resume: string;
}

export default function Portfolio({ data: initialData }: { data: PortfolioData | null }) {
  const [data, setData] = useState<PortfolioData | null>(initialData);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu visibility
  };

  useEffect(() => {
    if (!data) {
      fetch('https://66fbba9f8583ac93b40cf38f.mockapi.io/hairoil/v1/new')
        .then(res => res.json())
        .then(fetchedData => {
          console.log('Client-side fetched data:', fetchedData);
          setData(Array.isArray(fetchedData) ? fetchedData[0] : fetchedData);
        })
        .catch(error => console.error('Error fetching data client-side:', error));
    }
  }, [data]);

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-dark-bg">
  <header className="bg-dark-bg fixed top-0 w-full items-center py-6 px-4 md:px-6 lg:px-8 z-10">
  <nav className="flex justify-between items-center max-w-6xl mx-auto">
    {/* Toggle Button for Mobile */}
    <button
      className="md:hidden focus:outline-none"
      onClick={toggleMenu}
      aria-label="Toggle Menu"
    >
      <HamburgerIcon className="w-6 h-6 text-dark-text" />
    </button>

    {/* Navigation Links */}
    <div
      className={`space-x-4 md:flex ${
        isMenuOpen ? 'flex' : 'hidden'
      } md:block justify-center flex-1`}
    >
      <AnimatedLink href="#about">About</AnimatedLink>
      <AnimatedLink href="#projects">Projects</AnimatedLink>
      <AnimatedLink href="#skills">Skills</AnimatedLink>
      <AnimatedLink href="#contact">Contact</AnimatedLink>
    </div>
  </nav>
</header>


      <main className="max-w-6xl mx-auto px-4 py-16 md:px-6 lg:px-8">
        
        <section id="about" className="mb-16">
        <Image
              src={data.profile}
              alt={data.name}
              width={3000}
              height={3000}
             
            />
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div>
              <h2 className="text-4xl text-dark-text font-bold mb-4 py-4">Hello, I&apos;m {data.name}</h2>
              {/* <h3 className="text-2xl text-dark-text mb-4">{data.title}</h3> */}
              <p className="text-xl text-dark-text mb-6">{data.about}</p>
              <Link href={data.resume} passHref>
              <Button>Download CV</Button></Link> 
            </div>
          </div>
        </section>

        <section id="projects" className="mb-16">
          <h2 className="text-3xl text-dark-text font-bold mb-8">My Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {data.projects && data.projects.length > 0 ? (
              data.projects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src={project.image} // Use the image URL from project data
                      alt={project.title}
                      width={400}
                      height={200}
                      className="rounded-md mb-4"
                    />
                    <Link href={project.link}passHref>
                    <Button variant="outline">View Project</Button>
                    </Link> 
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">No projects available at the moment.</p>
            )}
          </div>
        </section>


        <section id="skills" className="mb-16">
          <h2 className="text-dark-text text-3xl font-bold mb-8">My Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.skills && data.skills.length > 0 ? (
              data.skills.map((skill) => (
                <div key={skill} className="bg-white rounded-md p-4 shadow-md">
                  <h3 className="font-semibold text-lg mb-2">{skill}</h3>
                  {/* <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${100}%` }}></div>
                  </div> */}
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">No skills available at the moment.</p>
            )}
          </div>
        </section>

        <section id="contact" className="mb-16">
          <h2 className="text-dark-text text-3xl font-bold mb-8">Get in Touch</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <Card className="flex-1">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardTitle>------------------------------------</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <EnvelopeIcon className="w-5 h-5" />
                    <a href="mailto:rajeshs09858@gmail.com" className="text-blue-500 font-bold hover:underline">
                      rajeshs09858@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5">
                          <path d="M12 2C6.48 2 2 6.48 2 12c0 1.64.4 3.17 1.1 4.53L2 22l5.47-1.1c1.36.7 2.89 1.1 4.53 1.1 5.52 0 10-4.48 10-10S17.52 2 12 2zm5.07 14.25c-.2.56-1.13 1.06-1.56 1.1-.4.04-.9.14-2.96-.63-2.49-.97-4.08-3.36-4.2-3.52-.11-.16-1-1.33-1-2.54s.63-1.8.86-2.05c.23-.26.5-.33.66-.33.15 0 .3.01.42.02.13.02.32-.05.5.38.2.46.66 1.6.72 1.7.05.1.07.2.01.32-.08.17-.12.29-.25.44-.13.15-.26.33-.37.44-.11.11-.23.23-.1.45.13.22.57.92 1.21 1.49.83.74 1.53.98 1.77 1.09.23.11.36.09.5-.05.13-.14.56-.65.72-.88.16-.22.31-.18.52-.11.21.07 1.32.62 1.54.74.23.12.38.17.43.27.06.1.06.58-.14 1.14z" />
                        </svg>
                        <a href="https://wa.me/+919483342491" className="text-blue-600 font-bold hover:underline">WhatsApp</a>
                      </div>

                  <div className="flex items-center gap-2">
                      <GithubIcon className="w-5 h-5" />
                      <a href="https://github.com/rajeshs098" className="text-blue-500 font-bold hover:underline">GitHub</a>
                    </div>
                  <div className="flex items-center gap-2">
                    <LinkedinIcon className="w-5 h-5" />
                    <a href="https://linkedin.com/in/rajs21" className="text-blue-500 font-bold hover:underline">Linkedin</a>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="flex-1">
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
              </CardHeader>
              <CardContent>
                  <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLSfYmQTNz6hp8pu6yzX_UySNJN8ma-T-Z4nnsYnRctMSaRsUEg/viewform?embedded=true"
                    className="border border-gray-300 rounded-md"
                  >
                    Loading…
                  </iframe>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <p>&copy; {new Date().getFullYear()} {data.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}