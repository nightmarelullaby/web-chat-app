"use client"
import {Box,Flex,HStack,Center,FormErrorMessage,VStack,Button,Text,Input,FormControl, FormLabel,InputGroup,InputRightElement} from "@/components/chakra-client/components"
import {useState} from "react"
import {AcademicCap} from "@heroicons/react"
import Link from "next/link" 
import {loginUser} from "@/services/auth/loginUser"
import { Field, Form, Formik } from 'formik';
 import * as Yup from 'yup';

 const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password:Yup.string()
      .min(6,"Too Short!")
      .max(50, 'Too Long!')
      .required('Password required'),
 });

export default function LoginForm(){
  const [showPassword,setShowPassoword] = useState(false)
  const passwordVisibility = () => {
    return setShowPassoword(prev => !prev)
  }
	     return (
        <Flex direction="column" gap="4" px="4">
        <Formik 
          validationSchema={LoginSchema}
          initialValues={{ email: '',password:'',}}
          onSubmit={async (values, actions) => {
            await actions.validateForm()
            try{
              actions.setSubmitting(true)
              const response = await loginUser(values)
              actions.setSubmitting(false)
              return console.log(response)
              // return actions.resetForm()            
            }catch(error){
              console.log(error.message)
            }
            // return actions.resetForm()            
          }}
        >
         {({handleSubmit,isSubmitting,values}) => (

          <Form onSubmit={handleSubmit}>
        {console.log(isSubmitting)}
          <Field name="email" >
             {({ field, form}) => (
                <FormControl isInvalid={form.errors.email && form.touched.email}>
                  <FormLabel  fontSize="sm"  fontFamily="system-ui" color="gray.800" fontWeight="600" letterSpacing=".4px">Email address</FormLabel>
                  <Input variant="outline_black" type="text" placeholder="Enter your email address" {...field} />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
          </Field>
          <Field name="password" >

             {({ field, form}) => (
                <FormControl mt="4" isInvalid={form.errors.password && form.touched.password}>
                   <FormLabel  fontFamily="system-ui" fontSize="sm" color="gray.800" fontWeight="600" letterSpacing=".4px">Password</FormLabel>
                     <InputGroup size='md'>
                        <Input
                          variant="outline_black" 
                          pr='4.5rem'
                          type={showPassword ? 'text' : 'password'}
                          placeholder='Enter password'
                          {...field} 
                        />
                        <InputRightElement h="100%" py="2" pr="4" width='4.5rem'>
                          <Button h='100%' bg="gray.100" color="gray.600"  borderColor="gray.400" borderWidth="1px" fontWeight="700" fontFamily="system-ui" size='sm' onClick={passwordVisibility}>
                            {showPassword ? 'Hide' : 'Show'}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  <FormErrorMessage>{values.password !== values.passwordConfirmation}</FormErrorMessage>
                </FormControl>
              )}
          </Field>
          <Button  
          mt="4"
            width="100%" py="6" fontFamily="system-ui" bg="gray.900" color="white" letterSpacing=".4px" fontWeight="500" fontSize="sm"
            transition=".15s ease"
            isLoading={isSubmitting}
            _hover={{bg:"gray.600",outlineOffset:"-2px",outlineWidth:"1px",bg:"transparent",color:"gray.900",outlineColor:"gray.900"}}
            _loading={{bg:"gray.900",opacity:1}}
            type="submit">
            Register
          </Button>
        </Form>)}
          
        </Formik>
      
          </Flex>
        )
}