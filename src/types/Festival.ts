


export type Festival = {
    
  contentid: string
  title: string
  firstimage: string
  firstimage2?: string
  addr1: string
  addr2?: string
  tel?: string
  createdtime: string;   
  modifiedtime: string; 
  


}


export type FestivalResponse = {
    response: {
        body: {
            items: {
                item: Festival[]
            }
        }
    }
}
