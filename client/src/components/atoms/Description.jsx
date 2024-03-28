import React from 'react'
import Image from 'next/image'

export default function Description({title,details,logo1,logo2,logoAtTop}) {
    
        return logoAtTop ? (
            <div className='bg-gray-500'>
                <Image className='block hover:hidden' src={logo1} height={30} width={30}></Image>
                <Image className='hidden hover:block' src={logo2} height={30} width={30}></Image>
                <h3 className=''>{title}</h3>
                <p>{details}</p>
            </div>
          )
    :   (
            <div>

            </div>
        )
    
 
}
