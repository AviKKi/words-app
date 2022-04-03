import { prop, getModelForClass, pre } from "@typegoose/typegoose";

class WordClass {
    @prop()
    word: string
}

const Word = getModelForClass(WordClass)

export default Word