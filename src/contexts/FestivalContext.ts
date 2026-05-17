import { createContext } from "react";
import type { Festival } from "../types/Festival";







type FestivalContextType = {
    selectFestival:(festival:Festival) =>void;
}

const FestivalContext = createContext<FestivalContextType | null>(null);
FestivalContext.displayName='FestivalContext';

export default FestivalContext;