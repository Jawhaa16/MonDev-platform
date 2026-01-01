import re
from typing import Optional


def validate_password(password: str) -> Optional[str]:
    """
    Validate password strength.
    Returns error message if invalid, None if valid.
    
    Requirements:
    - At least 8 characters
    - At least one uppercase letter
    - At least one lowercase letter
    - At least one digit
    - At least one special character
    """
    if len(password) < 8:
        return "Нууц үг хамгийн багадаа 8 тэмдэгт байх ёстой"
    
    if not re.search(r'[A-Z]', password):
        return "Нууц үг том үсэг агуулсан байх ёстой"
    
    if not re.search(r'[a-z]', password):
        return "Нууц үг жижиг үсэг агуулсан байх ёстой"
    
    if not re.search(r'\d', password):
        return "Нууц үг тоо агуулсан байх ёстой"
    
    if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
        return "Нууц үг тусгай тэмдэгт агуулсан байх ёстой (!@#$%^&* гэх мэт)"
    
    return None
