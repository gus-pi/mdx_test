import { Environment } from '@react-three/drei';
import { Swan } from './Swan';

const Experience = () => {
    return (
        <>
            <Environment
                preset="city"
                environmentIntensity={1}
                // environmentRotation={[Math.PI / 2, 0, 0]}
            />
            <Swan />
        </>
    );
};

export default Experience;
