       // Theme Toggle Functionality
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;

        // Check for saved theme preference or default to light mode
        const currentTheme = localStorage.getItem('theme') || 'light';
        body.setAttribute('data-theme', currentTheme);

        themeToggle.addEventListener('click', () => {
            const newTheme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });

        // Developer Card Click Handler
        document.querySelectorAll('.dev-card').forEach(card => {
            card.addEventListener('click', () => {
                const devId = card.getAttribute('data-dev');
                // This will be used to navigate to individual portfolios
                console.log(`Navigating to ${devId} portfolio`);
                // You can implement navigation logic here later
                // window.location.href = `${devId}.html`;
            });
        });

        // Enhanced Live Wallpaper Animation
        class EnhancedWallpaper {
            constructor() {
                this.particleLayer = document.getElementById('particleLayer');
                this.canvas = document.getElementById('neuralCanvas');
                this.ctx = this.canvas.getContext('2d');
                this.particles = [];
                this.connections = [];
                this.mouse = { x: 0, y: 0 };
                
                this.init();
                this.setupCanvas();
                this.createDynamicParticles();
                this.setupMouseTracking();
                this.animate();
            }

            init() {
                // Create dynamic particles
                for (let i = 0; i < 50; i++) {
                    this.createParticle();
                }
            }

            createParticle() {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                // Random properties
                const size = Math.random() * 6 + 2;
                const colors = ['#4f46e5', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6'];
                const color = colors[Math.floor(Math.random() * colors.length)];
                
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                particle.style.background = color;
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 20 + 's';
                particle.style.animationDuration = (Math.random() * 10 + 8) + 's';
                
                // Add glow effect
                particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
                
                this.particleLayer.appendChild(particle);
            }

            createDynamicParticles() {
                setInterval(() => {
                    if (this.particleLayer.children.length < 60) {
                        this.createParticle();
                    }
                }, 2000);
            }

            setupCanvas() {
                this.canvas.width = window.innerWidth;
                this.canvas.height = window.innerHeight;
                
                // Create neural network nodes
                for (let i = 0; i < 15; i++) {
                    this.particles.push({
                        x: Math.random() * this.canvas.width,
                        y: Math.random() * this.canvas.height,
                        vx: (Math.random() - 0.5) * 0.5,
                        vy: (Math.random() - 0.5) * 0.5,
                        radius: Math.random() * 3 + 1
                    });
                }

                window.addEventListener('resize', () => {
                    this.canvas.width = window.innerWidth;
                    this.canvas.height = window.innerHeight;
                });
            }

            setupMouseTracking() {
                document.addEventListener('mousemove', (e) => {
                    this.mouse.x = e.clientX;
                    this.mouse.y = e.clientY;
                });
            }

            drawNeuralNetwork() {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                
                const isDark = document.body.getAttribute('data-theme') === 'dark';
                const nodeColor = isDark ? 'rgba(99, 102, 241, 0.6)' : 'rgba(79, 70, 229, 0.4)';
                const lineColor = isDark ? 'rgba(148, 163, 184, 0.3)' : 'rgba(100, 116, 139, 0.2)';

                // Update particle positions
                this.particles.forEach(particle => {
                    particle.x += particle.vx;
                    particle.y += particle.vy;

                    // Bounce off edges
                    if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
                    if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

                    // Mouse interaction
                    const dx = this.mouse.x - particle.x;
                    const dy = this.mouse.y - particle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 150) {
                        particle.x -= dx * 0.01;
                        particle.y -= dy * 0.01;
                    }
                });

                // Draw connections
                for (let i = 0; i < this.particles.length; i++) {
                    for (let j = i + 1; j < this.particles.length; j++) {
                        const dx = this.particles[i].x - this.particles[j].x;
                        const dy = this.particles[i].y - this.particles[j].y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < 200) {
                            this.ctx.beginPath();
                            this.ctx.strokeStyle = lineColor;
                            this.ctx.lineWidth = (200 - distance) / 200;
                            this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                            this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                            this.ctx.stroke();
                        }
                    }
                }

                // Draw particles
                this.particles.forEach(particle => {
                    this.ctx.beginPath();
                    this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                    this.ctx.fillStyle = nodeColor;
                    this.ctx.fill();
                    
                    // Add glow effect
                    this.ctx.beginPath();
                    this.ctx.arc(particle.x, particle.y, particle.radius * 2, 0, Math.PI * 2);
                    this.ctx.fillStyle = isDark ? 'rgba(99, 102, 241, 0.1)' : 'rgba(79, 70, 229, 0.1)';
                    this.ctx.fill();
                });
            }

            animate() {
                this.drawNeuralNetwork();
                requestAnimationFrame(() => this.animate());
            }
        }

        // Initialize enhanced wallpaper when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new EnhancedWallpaper();
        });