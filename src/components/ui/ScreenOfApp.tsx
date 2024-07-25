
import screenshot from '../../assets/dashboard.png'
// import demo from '../../assets/demovideo.mp4'

export default function ScreenOfApp() {
  return (
    <img className='w-full h-full border-[5px] rounded-3xl border-slate-200 shadow-xl md:mb-12' src={screenshot} />

//     <video loop autoPlay muted className="w-full h-full border-[5px] rounded-3xl border-slate-200 shadow-xl md:mb-12">
//        <source src={demo} type="video/mp4" />
// </video>
  )
}
