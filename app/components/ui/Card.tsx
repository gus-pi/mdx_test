import Image from 'next/image';

interface CardProps {
    text: string;
    url: string;
    textUnder?: boolean;
}

const Card = ({ text, url, textUnder = false }: CardProps) => {
    return (
        <div
            className={`flex flex-col w-[700px] gap-4 
                ${textUnder ? 'items-end' : 'items-start'} 
                ${textUnder ? '' : 'flex-col-reverse'}`}
        >
            {/* Text Overlay - Optional styling to match your reference image */}
            <p
                className={`text-white/80 text-sm font-light leading-relaxed max-w-md px-2
                ${textUnder ? 'text-right' : 'text-left'}`}
            >
                {text}
            </p>

            <div className="relative overflow-hidden rounded-2xl bg-zinc-900">
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
