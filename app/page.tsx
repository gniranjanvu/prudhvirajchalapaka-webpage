export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-accent via-accent-light to-accent bg-clip-text text-transparent">
            PRUDHVI RAJ
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-accent via-accent-light to-accent bg-clip-text text-transparent">
            CHALAPAKA
          </h2>
        </div>
        
        <div className="space-y-4 mb-8">
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-semibold">
            Robotics & Automation Engineer
          </p>
          <p className="text-lg max-w-2xl text-gray-600 dark:text-gray-400 px-4">
            Portfolio website under construction. Full implementation coming soon with stunning animations, 
            comprehensive project showcase, and admin dashboard.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3 justify-center max-w-xl">
          {['#ROS2', '#Embedded', '#AI', '#PLC', '#NavStack', '#Gazebo'].map((tag) => (
            <span 
              key={tag}
              className="px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full text-sm font-mono text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
