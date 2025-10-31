<script lang="ts">
	import { onMount } from 'svelte';

	let stars: Array<{ 
		x: number; 
		y: number; 
		size: number; 
		opacity: number; 
		startX: number;
		startY: number;
		controlX1: number;
		controlY1: number;
		controlX2: number;
		controlY2: number;
		endX: number;
		endY: number;
		duration: number;
		progress: number;
		flickerSpeed: number;
	}> = [];

	let displayedText = '';
	const fullText = 'James';
	let typingComplete = false;

	// Cubic bezier interpolation
	function cubicBezier(t: number, p0: number, p1: number, p2: number, p3: number): number {
		const u = 1 - t;
		return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3;
	}

	onMount(() => {
		// Generate random stars with bezier curve paths
		const starCount = 50;
		stars = Array.from({ length: starCount }, () => {
			const startX = Math.random() * 100;
			const startY = Math.random() * 100;
			const endX = Math.random() * 100;
			const endY = Math.random() * 100;
			
			return {
				x: startX,
				y: startY,
				size: Math.random() * 2 + 1,
				opacity: Math.random() * 0.5 + 0.5,
				startX,
				startY,
				controlX1: startX + (Math.random() - 0.5) * 40,
				controlY1: startY + (Math.random() - 0.5) * 40,
				controlX2: endX + (Math.random() - 0.5) * 40,
				controlY2: endY + (Math.random() - 0.5) * 40,
				endX,
				endY,
				duration: 60000 + Math.random() * 40000, // 60-100 seconds per curve
				progress: Math.random(), // Start at random point in curve
				flickerSpeed: Math.random() * 3 + 2
			};
		});

		// Typing effect
		let charIndex = 0;
		const typingInterval = setInterval(() => {
			if (charIndex < fullText.length) {
				displayedText += fullText[charIndex];
				charIndex++;
			} else {
				typingComplete = true;
				clearInterval(typingInterval);
			}
		}, 75);

		// Animate star movement along bezier curves
		const movementInterval = setInterval(() => {
			stars = stars.map(star => {
				// Increment progress
				let newProgress = star.progress + (30 / star.duration);
				
				// Loop the animation
				if (newProgress >= 1) {
					newProgress = 0;
					// Generate new curve
					const newStartX = star.endX;
					const newStartY = star.endY;
					const newEndX = Math.random() * 100;
					const newEndY = Math.random() * 100;
					
					return {
						...star,
						progress: newProgress,
						startX: newStartX,
						startY: newStartY,
						controlX1: newStartX + (Math.random() - 0.5) * 40,
						controlY1: newStartY + (Math.random() - 0.5) * 40,
						controlX2: newEndX + (Math.random() - 0.5) * 40,
						controlY2: newEndY + (Math.random() - 0.5) * 40,
						endX: newEndX,
						endY: newEndY,
						x: cubicBezier(newProgress, newStartX, newStartX + (Math.random() - 0.5) * 40, newEndX + (Math.random() - 0.5) * 40, newEndX),
						y: cubicBezier(newProgress, newStartY, newStartY + (Math.random() - 0.5) * 40, newEndY + (Math.random() - 0.5) * 40, newEndY)
					};
				}
				
				// Calculate position on bezier curve
				const newX = cubicBezier(newProgress, star.startX, star.controlX1, star.controlX2, star.endX);
				const newY = cubicBezier(newProgress, star.startY, star.controlY1, star.controlY2, star.endY);
				
				return {
					...star,
					progress: newProgress,
					x: newX,
					y: newY
				};
			});
		}, 30);

		// Animate star flickering (much slower)
		const flickerInterval = setInterval(() => {
			stars = stars.map(star => ({
				...star,
				opacity: Math.random() * 0.3 + 0.6
			}));
		}, 2000);

		return () => {
			clearInterval(movementInterval);
			clearInterval(flickerInterval);
			clearInterval(typingInterval);
		};
	});
</script>

<div class="relative w-screen h-screen overflow-hidden flex items-center justify-center bg-[radial-gradient(ellipse_at_bottom,#1B2735_0%,#090A0F_100%)]">
	<div class="absolute w-full h-full top-0 left-0">
		{#each stars as star}
			<div
				class="absolute bg-white rounded-full shadow-[0_0_3px_rgba(255,255,255,0.8)] transition-all duration-300 ease-linear"
				style="
					left: {star.x}%;
					top: {star.y}%;
					width: {star.size}px;
					height: {star.size}px;
					opacity: {star.opacity};
				"
			></div>
		{/each}
	</div>

	<h1 class="font-sans relative z-10 text-5xl font-black text-white m-0 ">
		{displayedText}<span class="animate-pulse inline-block w-[0.5ch]" class:opacity-0={typingComplete}>|</span>
	</h1>
</div>



