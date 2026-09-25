import os

main_py_path = r'C:\Users\Hieu\Desktop\do an oto\Car-s-predict-price\main.py'
with open(main_py_path, 'r', encoding='utf-8') as f:
    content = f.read()

if 'from routers import bookings' not in content:
    content = content.replace('from routers import auth, fines, transactions, chat, cars', 'from routers import auth, fines, transactions, chat, cars, bookings')
    content = content.replace('app.include_router(cars.router, prefix="/api/v1/cars", tags=["Cars"])', 'app.include_router(cars.router, prefix="/api/v1/cars", tags=["Cars"])\napp.include_router(bookings.router, prefix="/api/v1/bookings", tags=["Bookings"])')
    with open(main_py_path, 'w', encoding='utf-8') as f:
        f.write(content)
print("Updated main.py")
