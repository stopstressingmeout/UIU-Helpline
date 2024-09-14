import {Calendar, Home as HomeIcon, Info, Map, MapPin, Phone} from "lucide-react"
import {Card} from "@/components/ui/card";

export default function Home() {
    return (
        <div className="flex flex-col justify-center items-center w-full">
            <header className="w-full py-12 md:py-24 lg:py-32 bg-primary">
                <div className="container mx-auto text-center px-4 md:px-6">
                    <h1 className="text-xl pb-5 tracking-tighter md:text-3xl text-white">
                        Welcome to <br/><span className="text-6xl text-orange-500"> UIU Helpline</span>
                    </h1>
                    <p className="mx-auto max-w-[700px] text-white md:text-xl">
                        Your one-stop resource for all student information and services at UIU.
                    </p>
                </div>
            </header>
            <section id="features" className="w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6 mx-auto">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Everything You
                        Need in One Place</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
                        {[
                            {
                                icon: Calendar,
                                title: "Event Calendar",
                                description: "Stay updated with university events and important dates."
                            },
                            {
                                icon: MapPin,
                                title: "Nearby Services",
                                description: "Find hospitals, food vendors, and other essential services."
                            },
                            {
                                icon: HomeIcon,
                                title: "Housing Solutions",
                                description: "Discover accommodation options near the campus."
                            },
                            {
                                icon: Info,
                                title: "University Info",
                                description: "Access comprehensive information about UIU."
                            },
                            {
                                icon: Map,
                                title: "Interactive Maps",
                                description: "Navigate the campus and surrounding areas with ease."
                            },
                            {
                                icon: Phone,
                                title: "24/7 Support",
                                description: "Get answers to commonly asked questions and more."
                            },
                        ].map((feature, index) => (
                            <Card key={index} className="flex flex-col items-center text-center p-6 group hover:shadow-lg">
                                <feature.icon className="h-12 w-12 mb-4 text-primary group-hover:text-orange-500"/>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-orange-500">{feature.title}</h3>
                                <p className="text-muted-foreground group-hover:text-orange-300">{feature.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
                <div className="container px-4 md:px-6 mx-auto">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">How UIU Helpline
                        Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                step: "1",
                                title: "Sign Up",
                                description: "Create your account with your university email."
                            },
                            {
                                step: "2",
                                title: "Explore Resources",
                                description: "Browse through our comprehensive database of information."
                            },
                            {
                                step: "3",
                                title: "Get Help",
                                description: "Access support or connect with relevant services as needed."
                            },
                        ].map((item, index) => (
                            <div key={index} className="flex flex-col items-center text-center">
                                <div
                                    className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className="text-muted-foreground">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
