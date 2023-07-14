import React,{useState,useEffect} from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import {  getCategory, updateaCategory} from './helper/adminapicall'
import { isAuthenticated } from '../auth/helper/index';



const UpdateCategory = ({match}) => {

    const {user,token} = isAuthenticated();

    const [values, setvalues] = useState({name:'',error:false,success:false});
      const{name,error,success}=values


    const preload = categoryId =>{
        getCategory(categoryId).then(data=>{
        // console.log(data)
        if(data.error){
            setvalues({...values,error:data.error})
        }
        else{
           
            setvalues({...values,name:data.name})
       
        }
      })
      
    }

   
    useEffect(() => {
     preload(match.params.categoryId);
    }, []);
    
  
    const handleChange =event =>{
        setvalues({...values,error:'',name:event.target.value})

}

const warningMessage=()=>{
    if(error){
        return <h4 className='text-danger'>failed to update category</h4>
}}
    const onSubmit= event=>{
      event.preventDefault();
      setvalues({...values,error:''})
      updateaCategory(match.params.categoryId,user._id,token,{name}).then(data=>{
        if(data.error){
            setvalues({...values,error:true,success:false})
        }
        else{
            setvalues({...values,error:false,success:true,name:''})

        }
      })

    }

    
    const successMessage=()=>{ if(success){
        return <h4 className='text-success'>Category updated Successfully!!</h4>
    }}

    

    const updateCategoryForm = () => (
        <form>
        <div className="form-group">
            
            <p className="lead">Enter the Category</p>
            <input type="text"
            className ="form-control my-3"
            onChange = {handleChange}
            placeholder = "For Ex. Summer"
            value = {name}
            required/>
            <button onClick = {onSubmit} className="btn btn-outline-info">Update the Category</button>
        </div>
    </form>
      );
  return (
    <Base title="Update Category here!" description='Welcome to the category update section' className='container bg-info p-2'>
    <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">Admin Home </Link>
    <div className="row bg-dark text-white rounded">  
        <div className="col-md-8 offset-md-2">
            {successMessage()}
            {warningMessage()}
            {updateCategoryForm()}
        </div>
    </div>
   
    </Base>
  )
}

export default UpdateCategory;
















