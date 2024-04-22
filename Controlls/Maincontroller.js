const nodemailer = require("nodemailer");
const adminmodel = require('../Models/adminmodel');
const Blogmodel = require("../Models/Blogmodel");
// const typemodel = require('../Models/typemodel');

const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator');


const transporter = nodemailer.createTransport({
    service: "Gmail",
    port: 587,
    secure: true,
    auth: {
        user: "avmakavana677@gmail.com",
        pass: "nsobyvcudyegtftp",
    },
});



// const defaultController = (req,res)=>{

//     // // let {sessionid}=req.cookies;
//     // // try{
//     // //     // if(sessionid){
//     //         res.render('index');   
//     // //     }else{
//     //         res.redirect('/signin');
//     // //     }
//     // // }catch(err){
//     // console.log(err);   
//     // // }

// };


const defaultController = (req, res) => {
    console.log("user log in....", req.user);
    res.render('index');

};


const signincontroller = (req, res) => {
    res.render('signin');
};

const signupcontrooler = (req, res) => {
    res.render('signup');
};

const adminregcontroller = async (req, res) => {

    const { name, username, email, Phone, password, Profession, bio } = req.body;
    const saltRounds = 10;

    bcrypt.hash(password, saltRounds, async (err, hash) => {
        // console.log(hash);
        try {
            const admin = new adminmodel({
                name,
                username,
                email,
                Phone,
                password: hash,
                Profession,
                bio,

            })

            await admin.save();
            req.flash('success', 'Registration successful. Please sign in.');
            res.redirect("/signin");
        } catch (err) {
            console.log(err);
            req.flash('error', 'Registration failed. Please try again.');
            res.redirect("/signup");
        }

        return hash;
    })
}

// const loginadmincontroller=async (req, res) => {
//     let { email, password } = req.body;

//     const admin = await adminmodel.find({ email });

//     if (admin.length != 0) {
//         bcrypt.compare(password, admin[0].password).then((result) => {
//             if (result == true) {
//                 res.cookie("sessionid", admin[0].id);
//                 res.redirect('/');
//             } else {
//                 res.redirect('/signin');
//             }
//         }).catch((err) => {
//             console.log(err);
//         });
//     } else {
//         res.redirect('/signup');
//     }
// };

const loginadmincontroller = async (req, res) => {
    res.redirect('/');
};


const logoutadmincontroller = (req, res) => {
    res.clearCookie("sessionid");
    res.redirect('/signin');
};


const formcontroller = async (req, res) => {
    res.render("form");
}

// const usere = async (req, res) => {
//     try {
//         let { sessionid } = req.cookies;

//         if (sessionid) {
//             res.render('index');
//         } else {
//             res.redirect('/signin');
//         }
//     } catch (err) {
//         console.log(err);
//     }
// };

// const tablecontroller = async (req, res) => {
//     let { sessionid } = req.cookies;
//     try {
//         const blogs = await Blogmodel.find({ usere: sessionid });
//         console.log(blogs);
//         res.render('table', { blogs: blogs });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Internal Server Error');
//     }
// };

const usere = async (req, res) => {
    try {
        // Check if req.user exists and contains user id
        if (req.user && req.user.id) {
            res.render('index');
        } else {
            res.redirect('/signin');
        }
    } catch (err) {
        console.log(err);
    }
};

const tablecontroller = async (req, res) => {
    try {
        
        if (req.user && req.user.id) {
            const userId = req.user.id;
            const blogs = await Blogmodel.find({ usere: userId });
            console.log(blogs);
            res.render('table', { blogs: blogs });
        } else {
           
            res.redirect('/signin');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};


// const useraddcontroller = async (req, res) => {
//     console.log(req.body);
//     try {
//         const { Title, Des, Rating, Author } = req.body;

//         const blog = new Blogmodel({
//             Title,
//             Des,
//             Rating,
//             Author,
//             usere: req.user.id
//         });

//         await blog.save();

//         res.redirect('/table');
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Internal Server Error');
//     }
// };
const deletecontroller=async(req,res) => {   
    let {id} =req.params;
    let deletemv=await Blogmodel.findOne({_id:id});
    console.log("delete movie",deletemv);


    await Blogmodel.deleteOne({_id: id});
    res.redirect('/table');

};

const useraddcontroller =async (req, res) => {

    let { editid } = req.body;

    console.log(req.file);
    console.log(req.body);
    // const { Title, Des, Rating, Author } = req.body;

    if (!editid) {

        const blog = new Blogmodel({
            Title:req.body.Title,
            Des:req.body.Des,
            Rating:req.body.Rating,
            Author:req.body.Author,
            usere: req.user.id

        })
        console.log("blogssss",blog);
        await blog.save();

        // res.redirect('/table');
    } else {

        let updatebook = await Blogmodel.updateOne({_id:editid},{
            Title:req.body.Title,
            Des:req.body.Des,
            Rating:req.body.Rating,
            Author:req.body.Author,
            // usere: req.user.id

        })

        console.log("updated success", updatebook);
    }
    res.redirect('/table');

};

const editblogcontroller  = async (req,res)=>{
    let id=req.params.id;
    
    const singleblog =await Blogmodel.findById(id);
   console.log(singleblog);
    res.render('editblog',{singleblog});
}


const myprofilecontroller = async (req, res) => {
    try {
        if (req.user) {
            const user = req.user;
            console.log(user);
            res.render('myprofile', { user: user });
        } else {
            res.redirect('/signin');
        }
    } catch (err) {
        console.error(err);
        res.redirect('/signin');
    }
};


const editcontroller = async (req, res) => {
    try {
        if (req.user) {
            const userId = req.user._id;
            const { name, email, username, bio, Phone, Profession } = req.body;

            const user = await adminmodel.findById(userId);
            if (user) {
                user.name = name;
                user.email = email;
                user.username = username;
                user.Phone = Phone;
                user.Profession = Profession;
                user.bio = bio;

                if (req.file) {
                    user.image = req.file.path;
                }

                await user.save();

                res.redirect('/myprofile');
            } else {
                res.redirect('/signin');
            }
        } else {
            res.redirect('/signin');
        }
    } catch (err) {
        console.error(err);
        res.redirect('/signin');
    }
};


const editprofilecontroller = async (req, res) => {
    try {
        if (req.user) {
            const user = req.user;
            res.render('editprofile', { user: user });
        } else {
            res.redirect('/signin');
        }
    } catch (err) {
        console.error(err);
        res.redirect('/signin');
    }
};



const changepasswordcontroller = async (req, res) => {
    try {
        if (req.user) {
            const userId = req.user._id;
            const { old_password, new_password, confirm_password } = req.body;

            const user = await adminmodel.findById(userId);
            if (!user) {
                return res.redirect('/signin');
            }

            const isMatch = await bcrypt.compare(old_password, user.password);
            if (!isMatch) {
                return res.render('changepassword', { error: 'Old password is incorrect' });
            }

            if (new_password !== confirm_password) {
                return res.render('changepassword', { error: 'New password and confirm password do not match' });
            }

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(new_password, saltRounds);

            user.password = hashedPassword;
            await user.save();

            res.redirect('/signin');
        } else {
            res.redirect('/signin');
        }
    } catch (err) {
        console.error(err);
        res.redirect('/signin');
    }
};


const changepassword = (req, res) => {
    res.render('changepassword', { error: null });
};

const forgetpass = (req, res) => {
    res.render("forgetpass");
}

const finduser = async (req, res) => {
    let { email } = req.body;

    adminmodel.findOne({ email }).then((user) => {
        console.log("user", user);
        const otp = otpGenerator.generate(4, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });

        // Email data
        const mailOptions = {
            from: 'avmakavana677@gmail.com',
            to: user.email,
            subject: 'Node.js Email Tutorial',
            text: `this is your otp: ${otp} .Do not sahre your OTP`,
        };


        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        console.log("OTP", otp);
        res.cookie("id", user.id);
        res.cookie('opt', otp);
        res.redirect('/otpvalidation');
    }).catch(() => {
        console.log("User Not Found");
    })

}

const otpvalidation = (req, res) => {
    res.render('otpvalidation');
}

const submitotp = (req, res) => {

    let { opt } = req.cookies;
    let { otp } = req.body;

    if (opt == otp) {
        res.redirect("/resetpassword");
        console.log("otp match");
    } else {
        res.redirect('/signin');
    }
}

const resetpassword = (req, res) => {
    res.render('resetpassword');
}


const newpass = async (req, res) => {

    const { id } = req.cookies;
    console.log("id", id);

    const { password, cpassword } = req.body;
    console.log(password + " " + cpassword);

    if (password === cpassword) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await adminmodel.findByIdAndUpdate(id, {
            password: hashedPassword
        });
        res.redirect('/signin');
    } else {
        res.redirect("/resetpassword");
    }

};

module.exports = { defaultController, signincontroller, signupcontrooler, adminregcontroller, loginadmincontroller, logoutadmincontroller, formcontroller, useraddcontroller, myprofilecontroller, editcontroller, editprofilecontroller, changepasswordcontroller, changepassword, tablecontroller, usere, forgetpass, finduser, otpvalidation, submitotp, resetpassword, newpass,editblogcontroller,deletecontroller };