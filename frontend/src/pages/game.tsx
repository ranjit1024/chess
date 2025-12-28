import Dchess from '@/component/chessDesktop';
import Mchess from '@/component/chessM';
import { useMediaQuery } from 'react-responsive'
export interface historyType{
from:string;
to:string;peice:string;
color:"b" | "w"
}

export default function Game() {
    const isMobile = useMediaQuery({maxWidth:768});
    return isMobile ? <Mchess/>:<Dchess/>
}




