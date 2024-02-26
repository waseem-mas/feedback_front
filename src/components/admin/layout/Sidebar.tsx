import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
    <div className='bg-white'>
        <div className='m-2'>
            <i className='bi bi-bootstrap-fill me-3 fs-4'></i>
            <span className='brand-name'>Waseem Usman</span>
        </div>
        <hr className='text-dark' />
        <div className='list-group list-group-flush'>
        <Link className='list-group-item py-2' to='/dashboard'>
               <i className='bi bi-speedometer2 fs-5 me-3'></i>
               <span><Link style={{textDecoration:'none'}} to='/dashboard/feedback'>Add Feedback</Link></span>
               </Link>
        <Link className='list-group-item py-2' to='/dashboard'>
               <i className='bi bi-house fs-5 me-3'></i>
               <span>FeedBack Listing</span>
        </Link>
        </div>
    </div>
  )
}

export default Sidebar
