// Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Cart State
        let cart = JSON.parse(localStorage.getItem('swiftcart_cart')) || [];
        
        function updateCartCount() {
            const count = cart.reduce((sum, item) => sum + item.quantity, 0);
            document.getElementById('cart-count').textContent = count;
        }

        // Fetch Top 3 Products for Trending Section
        async function fetchTrendingProducts() {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const products = await response.json();
                
                // Get top 3 rated products
                const trending = products
                    .sort((a, b) => b.rating.rate - a.rating.rate)
                    .slice(0, 3);
                
                displayTrendingProducts(trending);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        function displayTrendingProducts(products) {
            const container = document.getElementById('trending-products');
            
            container.innerHTML = products.map(product => `
                <div class="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group">
                    <div class="relative bg-gray-100 h-64 md:h-80 flex items-center justify-center p-4 overflow-hidden">
                        <img src="${product.image}" alt="${product.title}" class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300">
                    </div>
                    
                    <div class="p-5">
                        <div class="flex justify-between items-start mb-2">
                            <span class="text-xs font-medium px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 capitalize">
                                ${product.category}
                            </span>
                            <div class="flex items-center text-sm">
                                <i class="fas fa-star text-yellow-400 text-xs mr-1"></i>
                                <span class="text-gray-600">${product.rating.rate} (${product.rating.count})</span>
                            </div>
                        </div>
                        
                        <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2 h-12 text-sm leading-relaxed">
                            ${product.title}
                        </h3>
                        
                        <div class="text-lg font-bold text-gray-900 mb-4">$${product.price}</div>
                        
                        <div class="flex gap-2">
                            <button onclick="addToCart(${product.id})" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-2">
                                <i class="fas fa-eye text-xs"></i> Details
                            </button>
                            <button onclick="addToCart(${product.id})" class="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition flex items-center justify-center gap-2">
                                <i class="fas fa-shopping-cart text-xs"></i> Add
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        function addToCart(productId) {
            // Simple implementation - in real app, fetch product details first
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: productId,
                    quantity: 1
                });
            }
            
            localStorage.setItem('swiftcart_cart', JSON.stringify(cart));
            updateCartCount();
            
            // Show notification
            const notif = document.createElement('div');
            notif.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce';
            notif.textContent = 'Product added to cart!';
            document.body.appendChild(notif);
            setTimeout(() => notif.remove(), 3000);
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            updateCartCount();
            fetchTrendingProducts();
        });