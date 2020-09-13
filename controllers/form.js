const sgMail = require('@sendgrid/mail'); 
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.contactForm = (req, res) => {
    const { email, name, message } = req.body;
    //console.log(req.body);

    const emailData = {
        to: process.env.EMAIL_TO,
        from: process.env.EMAIL_FROM,
        subject: `Contact form - ${process.env.APP_NAME}`,
        text: `Email received from contact form \n
               Sender name: ${name} \n 
               Sender email: ${email} \n 
               Sender message: ${message}`,
        html: `
            <h4>Email received from contact form:</h4>
            <p>Sender name: ${name}</p>
            <p>Sender email: ${email}</p>
            <p>Sender message: ${message}</p>
            <hr />
            <p>This email may contain sensetive informaition</p>
            <p>https://blog.fraenkel.name</p>
        `
    };

    sgMail.send(emailData).then(sent => {
        return res.json({
            success: true
        });
    }).catch(error => {
        console.log(error.response.body);
    });
};

exports.contactBlogAuthorForm = (req, res) => {
    const { authorEmail, email, name, message } = req.body;
    //console.log(req.body);

    let mailList = [authorEmail, process.env.EMAIL_TO];

    const emailData = {
        to: mailList,
        from: process.env.EMAIL_FROM,
        subject: `Someone messaged you from - ${process.env.APP_NAME}`,
        text: `Email received from contact form \n
               Sender name: ${name} \n 
               Sender email: ${email} \n 
               Sender message: ${message}`,
        html: `
            <h4>Message received from:</h4>
            <p>name: ${name}</p>
            <p>email: ${email}</p>
            <p>message: ${message}</p>
            <hr />
            <p>This email may contain sensetive informaition</p>
            <p>https://blog.fraenkel.name</p>
        `
    };

    sgMail.send(emailData).then(sent => {
        return res.json({
            success: true
        });
    }).catch(error => {
        console.log(error.response.body);
    });
};

