import axios from 'axios';

export async function sendEmail(to: string, subject: string, text: string) {
  try {
    const response = await axios.post('/.netlify/functions/send-email', {
      to,
      subject,
      text
    });
    return response.data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}