import { WhyChooseUs } from "./HomeComponents/WhyChooseUs"

const About = () =>{
    return (
        <>
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold mb-4">About Us</h1>
                <p className="mb-8 md:mx-2">
                    Welcome to our travel website! We are dedicated to providing you with
                    the best travel experiences, whether you're looking for car services,
                    travel packages, accommodations, or delicious food.
                </p>
                <WhyChooseUs/>
            </div>
        </>
    )
}

export { About }