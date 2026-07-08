export default async function handler(req, res){

    if(req.method !== "POST"){
        return res.status(405).json({
            success:false
        });
    }


    const {token} = req.body;


    if(!token){
        return res.status(400).json({
            success:false
        });
    }


    const secret =
    process.env.RECAPTCHA_SECRET;


    const response =
    await fetch(
        "https://www.google.com/recaptcha/api/siteverify",
        {
            method:"POST",

            headers:{
                "Content-Type":
                "application/x-www-form-urlencoded"
            },

            body:
            `secret=${secret}&response=${token}`
        }
    );


    const data =
    await response.json();


    return res.json({

        success:
        data.success

    });

}
