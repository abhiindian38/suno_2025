import { Container } from '../components/layout/Container';
import { IndustryCard } from '../components/movies/IndustryCard';
import { industries } from '../config/industries';
import { useNavigate } from 'react-router-dom';

const IndustrySelection = () => {
    const navigate = useNavigate();

    const handleIndustryClick = (id: string) => {
        navigate(`/movies/${id}`);
    };

    return (
        <Container className="pb-24">
            <div className="text-center mb-16 tablet:mb-20">
                <h1 className="text-fluid-h1 mb-6">
                    Select <span className="text-primary italic uppercase">Industry</span>
                </h1>
                <p className="text-fluid-subtitle max-w-2xl mx-auto opacity-80">
                    Choose your cinematic universe to begin the journey into the world of sound and vision.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-x-8 gap-y-16 tablet:gap-x-12 tablet:gap-y-20 max-w-[1400px] mx-auto px-4 place-items-center mb-24">
                {industries.map((industry) => (
                    <IndustryCard
                        key={industry.id}
                        industry={industry}
                        onClick={handleIndustryClick}
                    />
                ))}
            </div>
        </Container>
    );
};

export default IndustrySelection;
