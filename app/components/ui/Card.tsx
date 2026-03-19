import Image from 'next/image';

interface CardProps {
    text: string;
    url: string;
    textUnder?: boolean;
}

const Card = ({ text, url, textUnder = false }: CardProps) => {
    return (
        <div
            className={`flex flex-col gap-4 
                ${textUnder ? 'items-end' : 'items-start'} 
                ${textUnder ? '' : 'flex-col-reverse'}`}
        >
            {/* Text Container */}
            <p
                className={`text-white text-xs md:text-xl font-light leading-relaxed px-2
                   w-[85vw] md:w-full max-w-lg md:max-w-md 
                ${textUnder ? 'text-right' : 'text-left'}`}
            >
                {text}
            </p>

            {/* Image Container */}
            <div className="relative overflow-hidden rounded-2xl bg-zinc-900 w-55 md:w-175">
                <Image
                    src={url}
                    alt={text}
                    width={705}
                    height={380}
                    className="rounded-2xl object-cover"
                />
            </div>
        </div>
    );
};

export default Card;
