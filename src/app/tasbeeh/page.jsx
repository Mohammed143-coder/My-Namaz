import TasbeehLayout from "@/components/Tasbeeh"

export const metadata = {
  title: 'Digital Tasbeeh | My Namaz',
  description: 'Digital prayer counter for dhikr and tasbeeh with progress tracking',
}

const Tasbeeh = () => {
  return (
   <div className='w-full min-h-screen bg-gradient-to-b from-amber-50 to-emerald-50'>
       <TasbeehLayout/>
   </div>
  )
}

export default Tasbeeh