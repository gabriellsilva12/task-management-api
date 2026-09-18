import dns from 'node:dns/promises'
import emailValidator from "node-email-verifier"

const validateEmail = async ( email ) => {
 
    email = email.trim().toLowerCase()

    const result = await emailValidator( email, {
        checkMx: false,
        checkDisposable: true,
        detailed: true,
    })
    
    if(!result.valid) {
        console.log("Invalid E-mail:", result)
        return false
    }

    const domain = email.split("@")[1]

    try {
        const records = await dns.resolveMx(domain)
        if(records.length > 0) return email
    } catch (err) {
        // console.log("MX lookup failed:", err.message)
        return false
    }
}   

export default validateEmail