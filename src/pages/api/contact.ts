import type { NextApiRequest, NextApiResponse } from 'next'

 
interface  ResponseData {
  location: Location | null,
  social: SocialMedia,
  phone: Phone
}

interface  Location {
  country: string;
  city: string;
  street: string;
}

interface  SocialMedia  {
  email: string;
  skype: string;
  telegram: string;
}

interface  Phone  {
  suport: string | null;
  office: string;
  personal: string;
}

 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const response:ResponseData={
    location:{ 
      city:"Jakarta", 
      country:"Indonesia", 
      street:"Jl. Brother"
    },
    phone:{
      office:"021 8098062",
      personal:"0821 2342 1234", 
      suport: null
    },
    social: {
      email:"septz@gmail.com",
      skype:"@septz",
      telegram:"@septz"
    }
  }
  res.status(200).json(response)
}