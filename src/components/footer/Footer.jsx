import { Container, Grid, Typography } from '@mui/material';
import './Footer.css'
const Footer = () => {
    return (
        <footer
            style={{
                display:'flex',
                alignItems:'center',
                width: '100%',
                backgroundColor: '#333',
                color: '#fff',
                height: '200px',
                padding: '20px 0',
                zIndex: 1000
            }}
        >
            <Container>
                <Grid sx={{display: 'flex', width: '100%', justifyContent: 'space-evenly'}}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" fontWeight="bold">
                            Contact Us
                        </Typography>
                        <Typography>
                            Address: 123 Main St, City
                            <br />
                            Phone: 123-456-7890
                            <br />
                            Email: info@example.com
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" fontWeight="bold">
                            Library Hours
                        </Typography>
                        <Typography>
                            Monday - Friday: 9am - 6pm
                            <br />
                            Saturday: 10am - 4pm
                            <br />
                            Sunday: Closed
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" fontWeight="bold">
                            Helpful Links
                        </Typography>
                        <Typography>
                           <a className='a_links' rel='noreferrer' href='https://picsartacademy.am/' target={'_blank'}>Academy Website</a>
                            <br />
                            <a className='a_links' rel='noreferrer' href='https://www.youtube.com/@PicsartAcademy' target='_blank'>YouTube</a>
                            <br />
                            <a className='a_links' rel='noreferrer' href='https://www.instagram.com/picsart__academy/' target='_blank'>Instagram</a>
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </footer>
    );
};

export default Footer;
