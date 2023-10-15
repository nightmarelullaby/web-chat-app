"use client"
import {Box,Flex,HStack,Center,FormErrorMessage,VStack,Button,Text,Input,FormControl, FormLabel,InputGroup,InputRightElement} from "@/components/chakra-client/components"
import {useState} from "react"
import {IconEye,IconEyeOff} from '@tabler/icons-react';
import Link from "next/link" 
import {loginUser} from "@/services/auth/loginUser"
import {useRouter} from "next/navigation"
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
  const router = useRouter()
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
              actions.resetForm()            
              return router.push("/chat")
            }catch(error){
              console.log(error.message)
            }
          }}
        >
         {({handleSubmit,isSubmitting,values}) => (

          <Form onSubmit={handleSubmit}>
          <Field name="email" >
             {({ field, form}) => (
                <FormControl isInvalid={form.errors.email && form.touched.email}>
                  <FormLabel  fontSize="sm" color="gray.800" fontWeight="600" letterSpacing=".4px">Email address</FormLabel>
                  <Input       py="6"  bg="gray.50" variant="outline_black" type="text" placeholder="Enter your email address" {...field} />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
          </Field>
          <Field name="password" >

             {({ field, form}) => (
                <FormControl mt="4" isInvalid={form.errors.password && form.touched.password}>
                   <FormLabel fontSize="sm" color="gray.800" fontWeight="600" letterSpacing=".4px">Password</FormLabel>
                     <InputGroup size='md'>
                        <Input
                          py="6"
                          variant="outline_black" 
                          pr='4.5rem'
                          bg="gray.50"
                          type={showPassword ? 'text' : 'password'}
                          placeholder='Enter password'
                          {...field} 
                        />
                        <InputRightElement h="100%" py="2" pr="4" width='4.5rem'>
                          <Button h='6' p="0" bg="gray.100" color="gray.600"  borderColor="gray.400" borderWidth="1px" fontWeight="700"size='sm' onClick={passwordVisibility}>
                            {showPassword ? <IconEyeOff size={20} color="#a0aec0"/> : <IconEye size={20} color="#a0aec0"/>}
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
            width="100%" py="6"  bg="gray.900" color="white" letterSpacing=".4px" fontWeight="500" fontSize="sm"
            transition=".15s ease"
            isLoading={isSubmitting}
            isDisabled={isSubmitting}
            _hover={{bg:"gray.600",outlineOffset:"-2px",outlineWidth:"1px",bg:"transparent",color:"gray.900",outlineColor:"gray.900"}}
            _loading={{bg:"gray.900",opacity:1}}
            type="submit">
            Log in
          </Button>
        </Form>)}
          
        </Formik>
      
          </Flex>
        )
}