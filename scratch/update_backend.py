import codecs
import re

# 1. Update schemas.py
schemas_path = r'C:\Users\Hieu\Desktop\do an oto\Car-s-predict-price\schemas.py'
schemas = codecs.open(schemas_path, 'r', 'utf-8').read()

schemas = re.sub(
    r'user_email: Optional\[str\] = None',
    'user_email: Optional[str] = None\n    user_signature: Optional[str] = None',
    schemas
)
codecs.open(schemas_path, 'w', 'utf-8').write(schemas)


# 2. Update transactions.py
trans_path = r'C:\Users\Hieu\Desktop\do an oto\Car-s-predict-price\routers\transactions.py'
trans = codecs.open(trans_path, 'r', 'utf-8').read()

# Add user_signature to transaction_record
trans = re.sub(
    r'"user_email": user_email,',
    '"user_email": user_email,\n        "user_signature": getattr(req.vehicle_data, \'user_signature\', None),',
    trans
)

# Return user_signature in get_certificate
trans = re.sub(
    r'"license_plate": record\.get\(\'license_plate\'\),',
    '"license_plate": record.get(\'license_plate\'),\n            "user_signature": record.get(\'user_signature\'),\n            "user_email": record.get(\'user_email\'),',
    trans
)

codecs.open(trans_path, 'w', 'utf-8').write(trans)

print("Updated backend successfully.")
