import { Container } from "../ui/container";
import { Categories } from "./categories";

export const FeaturesFirst = () => {
    return (
        <Container className="bg-transparent">
            <div className="w-full min-h-96  flex flex-col items-center justify-center">
                
                <Categories />
            </div>
        </Container>
    );
}