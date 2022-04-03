import { Word } from "../hooks/useWords"

interface WordCardProps {
    word: Word,
    children: React.ReactNode
}

export default function WordCard({word, ...props}: WordCardProps){
    return <div className="bg-white py-2 my-2 border-2 border-gray-300 rounded-md px-4 hover:border-sky-200">
        {props.children}
    </div>
}