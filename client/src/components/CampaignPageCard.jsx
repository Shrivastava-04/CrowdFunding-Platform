import React from 'react'

const CampaignPageCard = ({campaign}) => {
    function formatDateToDDMMYY(dateString) {
        const date = new Date(dateString);
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yy = String(date.getFullYear()).slice(-2);
        return `${dd}-${mm}-${yy}`;
    }
  return (
    <div className='p-5 rounded-xl shadow-md bg-gray-300 w-fit h-fit gap-5 flex flex-col items-center justify-evenly hover:shadow-lg transition-all duration-200'>
        <div className='flex w-full items-center justify-center flex-col'>
            {/* <h1>Title</h1> */}
            <h1 className='font-extrabold text-3xl text-gray-700'>{campaign&&campaign.title}</h1>
        </div>
        <div className='flex w-full items-center justify-center flex-col'>
            <h2 className='font-bold text-2xl text-gray-900'>
                {campaign&&campaign.description}
            </h2>
        </div>
        <div className='flex w-full items-center justify-evenly'>
            <div className='flex items-center justify-center flex-col '>
                <h2 className='font-extrabold text-xl text-gray-700'>Goal</h2>
                <h2 className='font-bold text-2xl text-gray-900'>{campaign&&campaign.goal}</h2>
            </div>
            <div className='flex items-center justify-center flex-col '>
                <h2 className='font-extrabold text-xl text-gray-700'>Amount Raised</h2>
                <h2 className='font-bold text-2xl text-gray-900'>{campaign&&campaign.amountRaised}</h2>
            </div>
        </div>
        <div className='flex w-full items-center justify-evenly gap-20'>
            <div className='flex items-center justify-center flex-col '>
                <h2 className='font-extrabold text-xl text-gray-700'>Creator</h2>
                <h2 className='font-bold text-2xl text-gray-900'>{campaign&&campaign.creatorId}</h2>
            </div>
            <div className='flex items-center justify-center flex-col '>
                <h2 className='font-extrabold text-xl text-gray-700'>Deadline</h2>
                <h2 className='font-bold text-2xl text-gray-900'>{campaign&&formatDateToDDMMYY(campaign.deadline)}</h2>
            </div>
        </div>
        <div className='flex items-center justify-center flex-col'>
            <h2 className='font-extrabold text-xl text-gray-700'>Images</h2>
            <div className='flex flex-wrap gap-3'>
                {campaign&&campaign.images.map((image)=>{
                    return (<img src={image} alt="Image" className='w-32 h-32' />)
                })}
            </div>
        </div>
    </div>
  )
}

export default CampaignPageCard
