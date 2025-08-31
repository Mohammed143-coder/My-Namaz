import SelectedMasjid from '@/components/Home/SelectedMasjid'


const selectedMasjid = async({params}) => {
    const {id}=await params

  return (
    <SelectedMasjid userId={id}/>
  )
}

export default selectedMasjid