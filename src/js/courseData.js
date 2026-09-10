const coursesDB = {
    "cpp-advanced": {
        id: "cpp-advanced",
        title: "C++ Programming: Core & Security",
        description: "Master low-level systems programming with focus on memory management, security vulnerabilities, and performance optimization",
        totalLessons: 20,
        difficulty: "Advanced",
        prerequisites: ["Basic programming knowledge", "Understanding of algorithms"],
        modules: [
            {
                moduleId: 1,
                moduleName: "Module 1: Foundations & Memory Architecture",
                moduleDescription: "Understand C++ fundamentals, memory models, and hardware interaction",
                lessons: [
                    {
                        id: 1,
                        title: "Low-Level Programming Philosophy",
                        difficulty: "Intermediate",
                        estimatedTime: "45 min",
                        keyTerms: ["Compiled Language", "ALU", "MMU", "Preprocessor"],
                        theory: `
                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">What Makes C++ Unique</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">C++ is a <strong>statically-typed, compiled language</strong> that bridges the gap between high-level abstractions and hardware-level control. Unlike interpreted languages, C++ code is transformed directly into machine instructions at compile-time, enabling direct CPU and memory manipulation.</p>
                            
                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Hardware Layer Interaction</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Through C++, you can interact with:</p>
                            <ul style="margin-bottom: 15px; color: #d1d5db; padding-left: 20px; list-style-type: disc;">
                                <li style="margin-bottom: 8px;"><strong style="color: #00d527;">ALU (Arithmetic Logic Unit)</strong> - Performs bitwise and arithmetic operations</li>
                                <li style="margin-bottom: 8px;"><strong style="color: #00d527;">MMU (Memory Management Unit)</strong> - Handles virtual memory and page translation</li>
                                <li style="margin-bottom: 8px;"><strong style="color: #00d527;">CPU Caches</strong> - L1, L2, L3 hierarchy for optimized data access</li>
                                <li style="margin-bottom: 8px;"><strong style="color: #00d527;">System Interrupts</strong> - Signal handlers for asynchronous events</li>
                            </ul>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Program Lifecycle</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Every C++ application execution begins at the <span style="color: #ffca2c; font-family: monospace; background: rgba(255, 202, 44, 0.1); padding: 2px 6px; border-radius: 3px;">main()</span> function. The Operating System allocates memory segments (Stack, Heap, Code, Data) and transfers control to this entry point.</p>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">The Preprocessor Stage</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Before compilation occurs, the <strong>Preprocessor</strong> processes directives like <span style="color: #4a6ee0; font-family: monospace; background: rgba(74, 110, 224, 0.1); padding: 2px 6px; border-radius: 3px;">#include</span>. The command <span style="color: #4a6ee0; font-family: monospace; background: rgba(74, 110, 224, 0.1); padding: 2px 6px; border-radius: 3px;">#include &lt;iostream&gt;</span> instructs it to inject the Standard Library's I/O declarations into your translation unit.</p>

                            <div style="background: rgba(74, 110, 224, 0.15); border-left: 4px solid #4a6ee0; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #4a6ee0; font-weight: bold; margin-bottom: 8px;">💡 Pro-Tip: Compilation Pipeline</p>
                                <p style="color: #d1d5db; margin: 0;">Source Code → Preprocessor → Compiler → Assembler → Linker → Executable Binary</p>
                            </div>
                        `,
                        codeExample: "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Outputting to the system console\n    std::cout << \"System initialized...\\n\";\n    std::cout << \"Accessing hardware layers...\\n\";\n    return 0; // Exit code 0 signals success to OS\n}",
                        codeExplanation: "The <span style=\"font-family: monospace; background: rgba(255,255,255,0.1); padding: 2px 4px; border-radius: 3px;\">std</span> namespace prevents naming conflicts by qualifying library functions. The return value tells the OS if execution succeeded (0) or failed (non-zero).",
                        bestPractices: [
                            "Always use std:: prefix or 'using namespace' to avoid ambiguity",
                            "Return 0 for successful execution, non-zero error codes for failures",
                            "Use \\n instead of endl for faster console output in production code"
                        ],
                        startingCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    // TODO: Output \"System Ready\" to the console\n    \n    return 0;\n}"
                    },
                    {
                        id: 2,
                        title: "Strict Typing & Integer Overflow",
                        difficulty: "Intermediate",
                        estimatedTime: "50 min",
                        keyTerms: ["Type System", "Integer Overflow", "Signed/Unsigned", "Data Types"],
                        theory: `
                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Type System Fundamentals</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">C++ enforces <strong>strict typing</strong> at compile-time. Unlike dynamically-typed languages, you must explicitly declare variable types. This allows the compiler to allocate the correct amount of memory and perform type-safe operations.</p>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Primitive Data Types</h3>
                            <table style="width: 100%; margin-bottom: 15px; border-collapse: collapse; color: #d1d5db;">
                                <tr style="background: rgba(74, 110, 224, 0.1); border-bottom: 1px solid rgba(74, 110, 224, 0.2);">
                                    <td style="padding: 10px; font-weight: bold; color: #4a6ee0;">Type</td>
                                    <td style="padding: 10px; font-weight: bold; color: #4a6ee0;">Size</td>
                                    <td style="padding: 10px; font-weight: bold; color: #4a6ee0;">Range</td>
                                    <td style="padding: 10px; font-weight: bold; color: #4a6ee0;">Purpose</td>
                                </tr>
                                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                                    <td style="padding: 10px; color: #ffca2c;"><span style="font-family: monospace;">char</span></td>
                                    <td style="padding: 10px;">1 byte</td>
                                    <td style="padding: 10px;">-128 to 127</td>
                                    <td style="padding: 10px;">Single ASCII character or small integer</td>
                                </tr>
                                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                                    <td style="padding: 10px; color: #ffca2c;"><span style="font-family: monospace;">int</span></td>
                                    <td style="padding: 10px;">4 bytes</td>
                                    <td style="padding: 10px;">≈-2.1B to +2.1B</td>
                                    <td style="padding: 10px;">General-purpose whole numbers</td>
                                </tr>
                                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                                    <td style="padding: 10px; color: #ffca2c;"><span style="font-family: monospace;">float</span></td>
                                    <td style="padding: 10px;">4 bytes</td>
                                    <td style="padding: 10px;">32-bit IEEE 754</td>
                                    <td style="padding: 10px;">Single-precision decimals (graphics, physics)</td>
                                </tr>
                                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                                    <td style="padding: 10px; color: #ffca2c;"><span style="font-family: monospace;">double</span></td>
                                    <td style="padding: 10px;">8 bytes</td>
                                    <td style="padding: 10px;">64-bit IEEE 754</td>
                                    <td style="padding: 10px;">High-precision scientific calculations</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; color: #ffca2c;"><span style="font-family: monospace;">bool</span></td>
                                    <td style="padding: 10px;">1 byte</td>
                                    <td style="padding: 10px;">true/false</td>
                                    <td style="padding: 10px;">Boolean logic conditions</td>
                                </tr>
                            </table>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Signed vs Unsigned Integers</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;"><strong style="color: #ffca2c;">Signed integers</strong> use one bit as a sign indicator, limiting positive range but allowing negative values. <strong style="color: #00d527;">Unsigned integers</strong> treat all bits as magnitude, doubling the positive range but forbidding negative values.</p>

                            <div style="background: rgba(255, 75, 75, 0.15); border-left: 4px solid #ff4b4b; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #ff4b4b; font-weight: bold; margin-bottom: 10px;">⚠️ Security Vulnerability: Integer Overflow</p>
                                <p style="color: #d1d5db; line-height: 1.6; margin-bottom: 10px;"><strong>Definition:</strong> Integer overflow occurs when an arithmetic operation produces a value exceeding the type's maximum representable value, causing the value to wrap around to the minimum.</p>
                                <p style="color: #d1d5db; line-height: 1.6; margin-bottom: 10px;"><strong>Exploitation:</strong> Attackers exploit this to bypass security checks, allocate negative amounts of memory, or trigger undefined behavior.</p>
                                <p style="color: #d1d5db; margin: 0;"><strong>Mitigation:</strong> Use wider types (long long), validate bounds before operations, or use safe arithmetic libraries.</p>
                            </div>
                        `,
                        codeExample: "// Integer Overflow Demonstration\nunsigned int maxVal = 4294967295; // Max value for unsigned int\nstd::cout << \"Max: \" << maxVal << std::endl;\n\nmaxVal = maxVal + 1; // Wraps around\nstd::cout << \"After Overflow: \" << maxVal; // Outputs: 0",
                        codeExplanation: "An unsigned 32-bit integer overflows after 2^32 - 1. The next increment wraps to 0. Signed integers exhibit similar behavior at their boundaries.",
                        bestPractices: [
                            "Use unsigned types only for quantities that are logically non-negative",
                            "Check boundaries before performing operations on user input",
                            "Use compiler warnings: -Woverflow, -Wsign-compare",
                            "Consider using safe integer libraries for critical security code"
                        ],
                        startingCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    // TODO: Create an int 'pin' and assign 1234, then print it\n    \n    return 0;\n}"
                    },
                    {
                        id: 3,
                        title: "Memory Addresses: The & Operator",
                        difficulty: "Intermediate",
                        estimatedTime: "40 min",
                        keyTerms: ["Memory Address", "Address-of Operator", "Virtual Memory", "ASLR"],
                        theory: `
                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Memory Address Space</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Every variable occupies a specific location in your computer's RAM, represented as a <strong>hexadecimal memory address</strong>. These addresses are unique identifiers that allow the CPU to locate and access data.</p>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Virtual vs Physical Memory</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Modern operating systems provide <strong>Virtual Memory</strong> isolation. Each process believes it has the entire address space (e.g., 0 to 2^32 on 32-bit systems), but the MMU (Memory Management Unit) translates these virtual addresses to physical RAM locations.</p>
                            
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;"><strong style="color: #00d527;">Benefits:</strong></p>
                            <ul style="margin-bottom: 15px; color: #d1d5db; padding-left: 20px; list-style-type: disc;">
                                <li style="margin-bottom: 8px;">Process isolation - One process cannot corrupt another's memory</li>
                                <li style="margin-bottom: 8px;">Swapping - OS can move memory to disk when RAM is full</li>
                                <li style="margin-bottom: 8px;">Address space layout randomization (ASLR) - Security mitigation against buffer overflow exploits</li>
                            </ul>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">The Address-of Operator (&)</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">The unary <span style="color: #00d527; font-weight: bold; font-family: monospace;">&</span> operator, when prefixed to a variable, returns its memory address. This is your gateway to pointer manipulation and low-level programming.</p>

                            <div style="background: rgba(0, 213, 39, 0.15); border-left: 4px solid #00d527; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #00d527; font-weight: bold; margin-bottom: 8px;">🔍 Reverse Engineering Insight</p>
                                <p style="color: #d1d5db; margin: 0;">Memory addresses are fundamental in debugging, profiling, and reverse engineering. Understanding address patterns helps identify buffer overflows and other memory exploits.</p>
                            </div>
                        `,
                        codeExample: "int secretData = 7788;\n\n// Print variable value\nstd::cout << \"Value: \" << secretData << std::endl;\n\n// Print memory address (hexadecimal)\nstd::cout << \"Address: \" << &secretData << std::endl;\nstd::cout << \"Address (hex): \" << std::hex << &secretData;",
                        codeExplanation: "The <span style=\"font-family: monospace;\">std::hex</span> manipulator forces output in hexadecimal format. Addresses change on each run due to ASLR (Address Space Layout Randomization).",
                        bestPractices: [
                            "Use std::cout with std::hex and std::dec for address formatting",
                            "Understand that addresses change per execution due to security randomization",
                            "Memory dumps are essential tools for reverse engineering and vulnerability analysis"
                        ],
                        startingCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int target = 100;\n    \n    // TODO: Print the memory address of 'target' in hexadecimal format\n    \n    return 0;\n}"
                    },
                    {
                        id: 4,
                        title: "Pointers & Memory Manipulation",
                        difficulty: "Advanced",
                        estimatedTime: "55 min",
                        keyTerms: ["Pointer", "Dereference", "Memory Indirection", "Address-to-Value"],
                        theory: `
                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">What Is a Pointer?</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">A <strong>Pointer</strong> is a variable that stores a memory address rather than a direct value. Instead of holding '100', it holds '0x7fff5fbff8ac' (an address pointing to where 100 is stored).</p>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Pointer Syntax</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">The <span style="color: #ffca2c; font-family: monospace; background: rgba(255, 202, 44, 0.1); padding: 2px 6px; border-radius: 3px;">*</span> symbol serves dual purposes:</p>
                            <ul style="margin-bottom: 15px; color: #d1d5db; padding-left: 20px; list-style-type: disc;">
                                <li style="margin-bottom: 8px;"><strong>Declaration:</strong> <span style="font-family: monospace;">int* ptr;</span> declares a pointer to an integer</li>
                                <li style="margin-bottom: 8px;"><strong>Dereference:</strong> <span style="font-family: monospace;">*ptr</span> retrieves the value at the pointed-to address</li>
                            </ul>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Dereferencing</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Dereferencing means "follow the pointer and access the value." The CPU interprets it as: 'Go to the address stored in this pointer and fetch the data.'</p>

                            <div style="background: rgba(74, 110, 224, 0.15); border-left: 4px solid #4a6ee0; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #4a6ee0; font-weight: bold; margin-bottom: 10px;">📊 Memory Visualization</p>
                                <p style="margin: 0; color: #d1d5db; font-family: monospace; line-height: 1.8;">
                                    Address: 0x1000 | Variable: health<br/>
                                    Value:   80<br/>
                                    <br/>
                                    Address: 0x2000 | Variable: ptr<br/>
                                    Value:   0x1000 (points to health)<br/>
                                    <br/>
                                    *ptr → Dereference → Access value at 0x1000 → 80
                                </p>
                            </div>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Why Pointers Matter</h3>
                            <ul style="margin-bottom: 15px; color: #d1d5db; padding-left: 20px; list-style-type: disc;">
                                <li style="margin-bottom: 8px;">Dynamic data structures (linked lists, trees, graphs)</li>
                                <li style="margin-bottom: 8px;">Function parameters that need to modify caller's data</li>
                                <li style="margin-bottom: 8px;">Heap memory allocation and management</li>
                                <li style="margin-bottom: 8px;">Interfacing with C libraries and system APIs</li>
                                <li style="margin-bottom: 8px;">Polymorphism through virtual function tables (vtables)</li>
                            </ul>
                        `,
                        codeExample: "int health = 80;\nint* ptr = &health; // ptr holds the address of health\n\nstd::cout << \"Value: \" << health << std::endl;    // 80\nstd::cout << \"Address: \" << ptr << std::endl;       // 0x7fff...\nstd::cout << \"Dereferenced: \" << *ptr << std::endl; // 80\n\n*ptr = 100; // Modify health via pointer\nstd::cout << \"Health now: \" << health; // 100",
                        codeExplanation: "The pointer <span style=\"font-family: monospace;\">ptr</span> creates an indirect reference. Changes via <span style=\"font-family: monospace;\">*ptr</span> directly affect the original variable.",
                        bestPractices: [
                            "Always initialize pointers before dereferencing",
                            "Use nullptr instead of NULL for null pointers",
                            "Enable compiler warnings: -Wuninitialized",
                            "Consider smart pointers (std::unique_ptr, std::shared_ptr) for modern code"
                        ],
                        startingCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int val = 10;\n    \n    // TODO: Create a pointer 'p' pointing to 'val'\n    // TODO: Use pointer dereference to double val's value\n    // TODO: Print the final value\n    \n    return 0;\n}"
                    },
                    {
                        id: 5,
                        title: "Bitwise Operations & Low-Level Manipulation",
                        difficulty: "Advanced",
                        estimatedTime: "60 min",
                        keyTerms: ["Bitwise AND", "Bitwise OR", "XOR", "Bit Shifting", "Cryptography"],
                        theory: `
                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Binary Fundamentals</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Bitwise operators manipulate individual bits (0s and 1s) within bytes. This is essential for:</p>
                            <ul style="margin-bottom: 15px; color: #d1d5db; padding-left: 20px; list-style-type: disc;">
                                <li style="margin-bottom: 8px;">Hardware communication (GPIO, registers, network protocols)</li>
                                <li style="margin-bottom: 8px;">Cryptography and data obfuscation</li>
                                <li style="margin-bottom: 8px;">Performance optimization through bit manipulation</li>
                                <li style="margin-bottom: 8px;">Embedded systems and firmware development</li>
                            </ul>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Bitwise Operations Reference</h3>
                            <table style="width: 100%; margin-bottom: 15px; border-collapse: collapse; color: #d1d5db;">
                                <tr style="background: rgba(74, 110, 224, 0.1); border-bottom: 1px solid rgba(74, 110, 224, 0.2);">
                                    <td style="padding: 10px; font-weight: bold; color: #4a6ee0;">Operator</td>
                                    <td style="padding: 10px; font-weight: bold; color: #4a6ee0;">Symbol</td>
                                    <td style="padding: 10px; font-weight: bold; color: #4a6ee0;">Truth Table</td>
                                    <td style="padding: 10px; font-weight: bold; color: #4a6ee0;">Use Case</td>
                                </tr>
                                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                                    <td style="padding: 10px;">AND</td>
                                    <td style="padding: 10px; font-family: monospace;">&</td>
                                    <td style="padding: 10px; font-family: monospace;">1&1=1, else=0</td>
                                    <td style="padding: 10px;">Masking, bit extraction</td>
                                </tr>
                                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                                    <td style="padding: 10px;">OR</td>
                                    <td style="padding: 10px; font-family: monospace;">|</td>
                                    <td style="padding: 10px; font-family: monospace;">0|0=0, else=1</td>
                                    <td style="padding: 10px;">Setting bits, flag combinations</td>
                                </tr>
                                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                                    <td style="padding: 10px;">XOR</td>
                                    <td style="padding: 10px; font-family: monospace;">^</td>
                                    <td style="padding: 10px; font-family: monospace;">0^0=0, 1^1=0, else=1</td>
                                    <td style="padding: 10px;">Encryption, bit toggle</td>
                                </tr>
                                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                                    <td style="padding: 10px;">NOT</td>
                                    <td style="padding: 10px; font-family: monospace;">~</td>
                                    <td style="padding: 10px; font-family: monospace;">~1=0, ~0=1</td>
                                    <td style="padding: 10px;">Bit inversion, complement</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px;">Left Shift</td>
                                    <td style="padding: 10px; font-family: monospace;"><<</td>
                                    <td style="padding: 10px; font-family: monospace;">Multiply by 2^n</td>
                                    <td style="padding: 10px;">Fast multiplication, bit positioning</td>
                                </tr>
                            </table>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">XOR: The Reversible Operation</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">XOR is unique because applying the same operation twice returns the original value: <span style="color: #ffca2c; font-family: monospace; background: rgba(255, 202, 44, 0.1); padding: 2px 6px; border-radius: 3px;">(A ^ B) ^ B = A</span></p>

                            <div style="background: rgba(255, 202, 44, 0.15); border-left: 4px solid #ffca2c; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #ffca2c; font-weight: bold; margin-bottom: 10px;">🔐 Cryptographic Application</p>
                                <p style="color: #d1d5db; line-height: 1.6; margin: 0;">XOR forms the basis of stream ciphers like the One-Time Pad (OTP). A single CPU cycle per byte makes it extremely fast for data obfuscation, though it's vulnerable to frequency analysis and should not be used as the sole encryption method in production systems.</p>
                            </div>
                        `,
                        codeExample: "// XOR Encryption/Decryption Demo\nint message = 42;  // Binary: 00101010\nint key = 7;       // Binary: 00000111\n\nint encrypted = message ^ key;  // XOR encryption\nstd::cout << \"Encrypted: \" << encrypted << std::endl;\n\nint decrypted = encrypted ^ key; // Apply XOR again\nstd::cout << \"Decrypted: \" << decrypted << std::endl; // Back to 42\n\n// Bit masking example\nint flags = 0b11110000;\nint mask = 0b00001111;\nint result = flags & mask; // Extract lower 4 bits",
                        codeExplanation: "XOR operates in O(1) time per operation, making it ideal for cryptography. Bit masking extracts specific bits by ANDing with a mask pattern.",
                        bestPractices: [
                            "Use XOR for simple obfuscation only, not production encryption",
                            "Create readable bit patterns using binary literals (0b prefix)",
                            "Document bit positions and meanings in complex bit fields",
                            "Use std::bitset for clearer manipulation of bit patterns"
                        ],
                        startingCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int data = 123;\n    int key = 9;\n    \n    // TODO: Encrypt 'data' with 'key' using XOR\n    // TODO: Decrypt the result using XOR again\n    // TODO: Verify original == decrypted\n    \n    return 0;\n}"
                    }
                ],
                quiz: [
                    { question: "Which keyword imports a library before compilation?", options: ["#define", "#include", "using", "namespace"], correctAnswer: 1 },
                    { question: "What is the memory size of a standard 'int' on most 64-bit systems?", options: ["1 byte", "2 bytes", "4 bytes", "8 bytes"], correctAnswer: 2 },
                    { question: "What happens during an 'Integer Overflow'?", options: ["The computer crashes", "The value wraps around to the minimum possible value", "The value stops at the maximum", "Memory is automatically expanded"], correctAnswer: 1 },
                    { question: "Which operator is used to get the memory address of a variable?", options: ["*", "!", "&", "^"], correctAnswer: 2 },
                    { question: "What does 'Dereferencing' a pointer mean?", options: ["Deleting the pointer", "Finding the pointer's address", "Accessing the value stored at the address the pointer holds", "Changing the pointer's type"], correctAnswer: 2 },
                    { question: "Which bitwise operator is used for reversible encryption?", options: ["& (AND)", "| (OR)", "^ (XOR)", "~ (NOT)"], correctAnswer: 2 },
                    { question: "Why does C++ lack automatic Garbage Collection?", options: ["To force developers to write more code", "To provide maximum performance and manual memory control", "Because it is an old language", "To save disk space"], correctAnswer: 1 },
                    { question: "What is stored in a pointer variable?", options: ["A character", "A whole number", "A memory address", "A boolean flag"], correctAnswer: 2 },
                    { question: "What symbol is used to declare a pointer type?", options: ["int&", "int*", "int#", "int^"], correctAnswer: 1 },
                    { question: "Which function serves as the mandatory entry point for a C++ application?", options: ["start()", "init()", "main()", "execute()"], correctAnswer: 2 }
                ]
            },
            {
                moduleId: 2,
                moduleName: "Module 2: Memory Mastery & Advanced Pointers",
                moduleDescription: "Deep dive into heap memory, dynamic allocation, arrays, and pointer arithmetic",
                lessons: [
                    {
                        id: 6,
                        title: "Arrays & Buffer Overflow Vulnerabilities",
                        difficulty: "Advanced",
                        estimatedTime: "55 min",
                        keyTerms: ["Buffer Overflow", "Array Bounds", "Stack Smashing", "Memory Corruption"],
                        theory: `
                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Array Structure in Memory</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">An <strong>Array</strong> is a contiguous block of identically-sized elements in memory. Arrays provide O(1) random access via index but lack runtime bounds checking.</p>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Why Bounds Checking Matters</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">C++ trusts developers to calculate array offsets correctly. This philosophy prioritizes performance over safety—array access is a single CPU instruction with no validation overhead.</p>

                            <div style="background: rgba(255, 75, 75, 0.15); border-left: 4px solid #ff4b4b; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #ff4b4b; font-weight: bold; margin-bottom: 10px;">🚨 CRITICAL VULNERABILITY: Buffer Overflow</p>
                                <p style="color: #d1d5db; line-height: 1.6; margin-bottom: 10px;"><strong>Definition:</strong> Writing data beyond an array's allocated boundary, overwriting adjacent memory.</p>
                                
                                <p style="color: #d1d5db; line-height: 1.6; margin-bottom: 10px;"><strong>Attack Scenarios:</strong></p>
                                <ul style="color: #d1d5db; padding-left: 20px; list-style-type: disc; margin-bottom: 10px;">
                                    <li style="margin-bottom: 6px;"><strong>Return Address Overwrite:</strong> Modify the function's return address to jump to attacker code</li>
                                    <li style="margin-bottom: 6px;"><strong>Stack Canary Bypass:</strong> Overwrite security cookies protecting stack integrity</li>
                                    <li style="margin-bottom: 6px;"><strong>Heap Exploitation:</strong> Corrupt heap metadata to trigger code execution</li>
                                    <li><strong>Shellcode Injection:</strong> Write malicious binary code and redirect execution to it</li>
                                </ul>

                                <p style="color: #d1d5db; line-height: 1.6;"><strong>Real-World Example:</strong> The Morris Worm (1988), Code Red (2001), and Heartbleed (2014) all exploited buffer overflows.</p>
                            </div>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Array Memory Layout</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6; font-family: monospace; background: rgba(255,255,255,0.05); padding: 10px; border-radius: 4px;">
                                secureKeys[5] = {101, 202, 303, 404, 505}<br/>
                                [Address] [101] [202] [303] [404] [505] [????]<br/>
                                0x1000    0x1004 0x1008 0x100C 0x1010 0x1014 0x1018<br/>
                                &larr;─── Valid Access Zone ───&rarr; &larr;─ Danger Zone ─&rarr;
                            </p>
                        `,
                        codeExample: "int secureKeys[5] = {101, 202, 303, 404, 505};\n\n// Safe access\nstd::cout << \"Index 0: \" << secureKeys[0] << std::endl; // 101\n\n// VULNERABILITY: Accessing index 10\nsecureKeys[10] = 999; // Overwrites memory beyond array!\n\n// This corrupts whatever data is stored at that address\n// Potential impact: modified passwords, function pointers, or return addresses",
                        codeExplanation: "C++ performs <strong>NO runtime bounds checking</strong>. The CPU simply calculates: <span style=\"font-family: monospace; background: rgba(255,255,255,0.1); padding: 2px 4px; border-radius: 3px;\">address = &array[0] + (index * sizeof(element))</span> without validation.",
                        bestPractices: [
                            "Always validate array indices against size before access",
                            "Use std::array<T, N> or std::vector<T> with bounds checking",
                            "Enable compiler warnings: -Warray-bounds",
                            "Use Address Sanitizer during development: -fsanitize=address",
                            "Implement input validation for any user-controlled indices"
                        ],
                        startingCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int data[3] = {10, 20, 30};\n    \n    // TODO: Access and print the SECOND element (index 1)\n    // TODO: Ensure your index is within bounds [0, 2]\n    \n    return 0;\n}"
                    },
                    {
                        id: 7,
                        title: "Memory Layout: Stack vs Heap",
                        difficulty: "Advanced",
                        estimatedTime: "50 min",
                        keyTerms: ["Stack Memory", "Heap Memory", "LIFO", "Dynamic Allocation", "Memory Segmentation"],
                        theory: `
                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Memory Segmentation</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">The operating system divides a process's address space into distinct regions:</p>
                            
                            <div style="background: rgba(74, 110, 224, 0.1); padding: 15px; margin: 20px 0; border-radius: 6px; font-family: monospace; color: #d1d5db; font-size: 13px; line-height: 1.8;">
                                High Address (0xFFFFFFFF)<br/>
                                &uarr;&uarr;&uarr;&uarr;&uarr;&uarr;&uarr;&uarr;&uarr;&uarr;&uarr;&uarr;&uarr;&uarr;&uarr;&uarr;<br/>
                                ┌─────────────────┐<br/>
                                │  Stack (grows ↓) │ ← Local variables, function calls<br/>
                                ├─────────────────┤<br/>
                                │  Unused Space   │<br/>
                                ├─────────────────┤<br/>
                                │  Heap (grows ↑)  │ ← Dynamic memory (new/malloc)<br/>
                                ├─────────────────┤<br/>
                                │  BSS/Data       │ ← Global/static variables<br/>
                                ├─────────────────┤<br/>
                                │  Code/Text      │ ← Machine instructions<br/>
                                └─────────────────┘<br/>
                                Low Address (0x00000000)
                            </div>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">The Stack</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;"><strong>Characteristics:</strong></p>
                            <ul style="margin-bottom: 15px; color: #d1d5db; padding-left: 20px; list-style-type: disc;">
                                <li style="margin-bottom: 8px;"><strong>Automatic Management:</strong> CPU-managed via stack pointer (RSP register)</li>
                                <li style="margin-bottom: 8px;"><strong>LIFO Structure:</strong> Last-In-First-Out - variables destroyed in reverse order</li>
                                <li style="margin-bottom: 8px;"><strong>Fast Access:</strong> Single CPU cycle for push/pop operations</li>
                                <li style="margin-bottom: 8px;"><strong>Limited Size:</strong> Typically 1-8 MB per thread (platform-dependent)</li>
                                <li style="margin-bottom: 8px;"><strong>Function Scope:</strong> Memory reclaimed when function returns</li>
                            </ul>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">The Heap</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;"><strong>Characteristics:</strong></p>
                            <ul style="margin-bottom: 15px; color: #d1d5db; padding-left: 20px; list-style-type: disc;">
                                <li style="margin-bottom: 8px;"><strong>Manual Management:</strong> Developer controls allocation/deallocation</li>
                                <li style="margin-bottom: 8px;"><strong>Dynamic Size:</strong> Can grow up to physical RAM (several GB)</li>
                                <li style="margin-bottom: 8px;"><strong>Slower Access:</strong> Pointer dereference required</li>
                                <li style="margin-bottom: 8px;"><strong>Fragmentation Risk:</strong> Repeated alloc/dealloc can fragment memory</li>
                                <li style="margin-bottom: 8px;"><strong>Indefinite Lifetime:</strong> Must explicitly free or leak occurs</li>
                            </ul>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Stack Overflow vs Heap Overflow</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;"><strong style="color: #ff4b4b;">Stack Overflow:</strong> Creating excessively large arrays or deep recursion exhausts stack space, crashing the program.</p>
                            <p style="color: #d1d5db; line-height: 1.6;"><strong style="color: #ff4b4b;">Heap Overflow:</strong> Writing past allocated heap block corrupts heap metadata or adjacent allocations, enabling code execution.</p>
                        `,
                        codeExample: "// Stack: Automatic cleanup\nvoid stackExample() {\n    int x = 5;              // Stack allocation\n    double y = 3.14;       // Stack allocation\n    \n    // Both x and y destroyed automatically here\n}\n\n// Heap: Manual cleanup\nint* heapExample() {\n    int* ptr = new int;    // Heap allocation\n    *ptr = 42;\n    \n    // ptr must be explicitly deleted by caller\n    return ptr;\n}",
                        codeExplanation: "Stack variables have automatic lifetime. Heap variables persist until explicitly deleted. Forgetting to delete heap memory causes memory leaks.",
                        bestPractices: [
                            "Use stack for small, fixed-size data with known lifetime",
                            "Reserve heap for large data structures or data needing long lifetime",
                            "Use RAII (Resource Acquisition Is Initialization) patterns",
                            "Modern C++: Prefer std::unique_ptr and std::shared_ptr over raw new/delete"
                        ],
                        startingCode: "// This lesson is theoretical. \n// Review the concepts and press 'Next' to continue."
                    },
                    {
                        id: 8,
                        title: "Dynamic Allocation: new & delete",
                        difficulty: "Advanced",
                        estimatedTime: "55 min",
                        keyTerms: ["new Operator", "delete Operator", "Memory Leak", "Dangling Pointer", "RAII"],
                        theory: `
                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">The 'new' Operator</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">The <span style="color: #4a6ee0; font-family: monospace; background: rgba(74, 110, 224, 0.1); padding: 2px 6px; border-radius: 3px;">new</span> operator allocates memory on the Heap and returns a pointer to the allocated memory. This memory persists until explicitly deallocated.</p>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">The 'delete' Operator</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">The <span style="color: #ff4b4b; font-family: monospace; background: rgba(255, 75, 75, 0.1); padding: 2px 6px; border-radius: 3px;">delete</span> operator deallocates heap memory, freeing it for reuse. This is <strong>MANDATORY</strong>.</p>

                            <div style="background: rgba(0, 213, 39, 0.15); border-left: 4px solid #00d527; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #00d527; font-weight: bold; margin-bottom: 10px;">🏆 Golden Rule of Memory Management</p>
                                <p style="color: #d1d5db; line-height: 1.6; margin: 0;">
                                    Every <span style="font-family: monospace; background: rgba(255,255,255,0.1); padding: 2px 4px; border-radius: 2px;">new</span> must have a matching <span style="font-family: monospace; background: rgba(255,255,255,0.1); padding: 2px 4px; border-radius: 2px;">delete</span>.
                                    <br/>This prevents memory leaks in long-running applications (servers, daemons, embedded systems).
                                </p>
                            </div>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Memory Leak Consequences</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Over time, unreleased heap memory accumulates:</p>
                            <ul style="margin-bottom: 15px; color: #d1d5db; padding-left: 20px; list-style-type: disc;">
                                <li style="margin-bottom: 8px;"><strong>Performance Degradation:</strong> Available RAM continuously decreases</li>
                                <li style="margin-bottom: 8px;"><strong>System Crash:</strong> Eventually runs out of memory, application terminates</li>
                                <li style="margin-bottom: 8px;"><strong>Denial of Service:</strong> Attackers exploit memory leaks to crash servers</li>
                                <li style="margin-bottom: 8px;"><strong>Data Persistence:</strong> Sensitive data may persist in freed memory</li>
                            </ul>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Dangling Pointers</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">A <strong>Dangling Pointer</strong> references memory that has already been freed. Dereferencing it causes undefined behavior.</p>

                            <div style="background: rgba(255, 75, 75, 0.15); border-left: 4px solid #ff4b4b; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #ff4b4b; font-weight: bold; margin-bottom: 10px;">⚠️ Preventing Dangling Pointers</p>
                                <p style="color: #d1d5db; line-height: 1.6;">After deletion, immediately set the pointer to <span style="font-family: monospace; background: rgba(255,255,255,0.1); padding: 2px 4px; border-radius: 2px;">nullptr</span>. This prevents accidental reuse and helps debugging.</p>
                            </div>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Arrays and 'new'/'delete'</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">When allocating arrays with <span style="font-family: monospace;">new</span>, use <span style="font-family: monospace;">delete[]</span> (with brackets) to properly destruct all elements and free the correct amount of memory.</p>
                        `,
                        codeExample: "// Single allocation\nint* single = new int;\n*single = 100;\ndelete single;\nsingle = nullptr; // Best practice\n\n// Array allocation\nint* arr = new int[10];\narr[0] = 5;\ndelete[] arr;  // Note: delete[] not delete\narr = nullptr;\n\n// Safe encapsulation (RAII)\nclass ManagedMemory {\npubate:\n    int* data;\n    ManagedMemory(int size) {\n        data = new int[size];\n    }\n    ~ManagedMemory() {\n        delete[] data; // Guaranteed cleanup\n    }\n};",
                        codeExplanation: "RAII ensures cleanup happens automatically when the object goes out of scope. The destructor executes whether you remember <span style=\"font-family: monospace;\">delete</span> or not.",
                        bestPractices: [
                            "Always set pointers to nullptr after deletion",
                            "Use delete[] for arrays, delete for single objects",
                            "Enable memory debugging: valgrind, AddressSanitizer",
                            "Modern C++17+: Use std::unique_ptr and std::make_unique",
                            "Track all new/delete pairs in code reviews"
                        ],
                        startingCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    // TODO: Allocate an int on heap using 'new'\n    // TODO: Set its value to 77\n    // TODO: Print the value via dereferencing\n    // TODO: Delete the memory and set to nullptr\n    \n    return 0;\n}"
                    },
                    {
                        id: 9,
                        title: "Pointer Arithmetic & Navigation",
                        difficulty: "Advanced",
                        estimatedTime: "50 min",
                        keyTerms: ["Pointer Arithmetic", "Array Traversal", "Offset Calculation", "Type Scaling"],
                        theory: `
                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Array Names as Pointers</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">In C++, an array name <strong>decays into a pointer to its first element</strong>. This allows pointer arithmetic to navigate through array elements.</p>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Pointer Arithmetic Rules</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">When you add an integer to a pointer, it doesn't add that number of bytes. Instead, it adds <strong>multiples of the element type's size</strong>:</p>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6; font-family: monospace; background: rgba(255,255,255,0.05); padding: 10px; border-radius: 4px;">
                                ptr + n = ptr + (n × sizeof(element_type))
                            </p>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Example Walkthrough</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6; font-family: monospace; background: rgba(255,255,255,0.05); padding: 10px; border-radius: 4px;">
                                int arr[3] = {10, 20, 30};<br/>
                                int* p = arr;  // p points to arr[0]<br/>
                                <br/>
                                p++;  // Move to arr[1], address += 4 bytes<br/>
                                *p;   // Returns 20<br/>
                                <br/>
                                p += 2; // Move to arr[3] (OUT OF BOUNDS!)<br/>
                                *p;    // Undefined behavior
                            </p>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Pointer Comparison</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Pointers support relational operators for boundary checking:</p>
                            <ul style="margin-bottom: 15px; color: #d1d5db; padding-left: 20px; list-style-type: disc;">
                                <li style="margin-bottom: 8px;"><span style="font-family: monospace;">p < end</span> - Check if within bounds</li>
                                <li style="margin-bottom: 8px;"><span style="font-family: monospace;">p == nullptr</span> - Check for null pointer</li>
                                <li style="margin-bottom: 8px;"><span style="font-family: monospace;">p1 - p2</span> - Calculate distance between pointers</li>
                            </ul>

                            <div style="background: rgba(255, 75, 75, 0.15); border-left: 4px solid #ff4b4b; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #ff4b4b; font-weight: bold; margin-bottom: 10px;">⚠️ Danger Zone: Out-of-Bounds Arithmetic</p>
                                <p style="color: #d1d5db; line-height: 1.6; margin: 0;">Pointer arithmetic beyond array bounds is undefined behavior. The program may crash immediately or exhibit mysterious behavior later. Always validate arithmetic results against array boundaries.</p>
                            </div>
                        `,
                        codeExample: "int arr[3] = {10, 20, 30};\nint* p = arr; // Points to first element\n\nstd::cout << \"p[0]: \" << *p << std::endl;      // 10\n\np++; // Pointer arithmetic: advance by 4 bytes\nstd::cout << \"p[1]: \" << *p << std::endl;      // 20\n\nstd::cout << \"*(p+1): \" << *(p + 1) << std::endl; // 30\n\n// Pointer subtraction\nint* pEnd = arr + 3;  // Points past last element (not valid to dereference)\nint distance = pEnd - arr;  // 3 elements\nstd::cout << \"Array size: \" << distance << std::endl;",
                        codeExplanation: "Pointer arithmetic enables efficient array traversal. The compiler automatically scales offsets by element size. Pointer subtraction gives the number of elements between two pointers.",
                        bestPractices: [
                            "Always maintain size or end pointer to check bounds",
                            "Use iterators (std::vector::iterator) for safer traversal",
                            "Enable compiler warnings for pointer overflow: -Wpointer-arith",
                            "Consider using std::span (C++20) for pointer + size pairs"
                        ],
                        startingCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int sequence[3] = {55, 66, 77};\n    int* ptr = sequence;\n    \n    // TODO: Use pointer arithmetic to navigate to the third element\n    // TODO: Print the value 77\n    \n    return 0;\n}"
                    },
                    {
                        id: 10,
                        title: "References vs Pointers: Safe Indirection",
                        difficulty: "Advanced",
                        estimatedTime: "45 min",
                        keyTerms: ["Reference", "Alias", "Const Reference", "Parameter Passing", "Memory Efficiency"],
                        theory: `
                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">What Is a Reference?</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">A <strong>Reference</strong> is an <strong>automatic alias</strong> to an existing variable. Unlike pointers, references cannot be reassigned or made null. They provide safe, automatic dereferencing.</p>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Pointers vs References: Quick Comparison</h3>
                            <table style="width: 100%; margin-bottom: 15px; border-collapse: collapse; color: #d1d5db;">
                                <tr style="background: rgba(74, 110, 224, 0.1); border-bottom: 1px solid rgba(74, 110, 224, 0.2);">
                                    <td style="padding: 10px; font-weight: bold; color: #4a6ee0;">Feature</td>
                                    <td style="padding: 10px; font-weight: bold; color: #4a6ee0;">Pointer</td>
                                    <td style="padding: 10px; font-weight: bold; color: #4a6ee0;">Reference</td>
                                </tr>
                                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                                    <td style="padding: 10px;">Null-able</td>
                                    <td style="padding: 10px; color: #ff4b4b;">Yes (dangerous)</td>
                                    <td style="padding: 10px; color: #00d527;">Never</td>
                                </tr>
                                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                                    <td style="padding: 10px;">Reassignable</td>
                                    <td style="padding: 10px; color: #ffca2c;">Yes (mutable)</td>
                                    <td style="padding: 10px; color: #ff4b4b;">No (const)</td>
                                </tr>
                                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                                    <td style="padding: 10px;">Dereference syntax</td>
                                    <td style="padding: 10px;"><span style="font-family: monospace;">*ptr</span></td>
                                    <td style="padding: 10px;"><span style="font-family: monospace;">ref</span> (implicit)</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px;">Must initialize at declaration</td>
                                    <td style="padding: 10px;">No</td>
                                    <td style="padding: 10px; color: #00d527;">Yes</td>
                                </tr>
                            </table>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Use Cases: When to Use References</h3>
                            <ul style="margin-bottom: 15px; color: #d1d5db; padding-left: 20px; list-style-type: disc;">
                                <li style="margin-bottom: 8px;"><strong>Function Parameters:</strong> Pass large objects by reference to avoid copying</li>
                                <li style="margin-bottom: 8px;"><strong>Const References:</strong> Guarantee caller won't modify data (read-only views)</li>
                                <li style="margin-bottom: 8px;"><strong>Return Values:</strong> Return references to data that must not be copied</li>
                                <li style="margin-bottom: 8px;"><strong>Operator Overloading:</strong> Essential for stream operators (<<, >>)</li>
                            </ul>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Const References: Safe Sharing</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">A <span style="font-family: monospace; background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 3px;">const reference</span> guarantees the referenced data cannot be modified. This allows efficient parameter passing without copy overhead or mutation risk.</p>
                        `,
                        codeExample: "// Reference basics\nint target = 50;\nint& ref = target;  // ref is an alias for target\n\nref = 100;\nstd::cout << target;  // Outputs 100 (modified via reference)\n\n// Const reference for safe parameter passing\nvoid processVector(const std::vector<int>& vec) {\n    // Can read vec, but cannot modify it\n    for (const auto& val : vec) {\n        std::cout << val << \" \";\n    }\n    // No copy overhead, parameter is const-protected\n}\n\n// Pointer alternative (less safe)\nvoid processVectorPtr(const std::vector<int>* vec) {\n    if (vec == nullptr) return;  // Null check required\n    // Can read *vec, but cannot modify it\n}",
                        codeExplanation: "References eliminate dereference syntax while providing safety. Const references prevent accidental modification and are the modern C++ best practice for parameter passing.",
                        bestPractices: [
                            "Use const references for read-only parameters of large objects",
                            "Non-const references signal the function modifies the parameter",
                            "Never return references to local variables (use pointers with care)",
                            "References are zero-overhead abstractions (compile-time feature)"
                        ],
                        startingCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int health = 100;\n    \n    // TODO: Create a reference 'h' aliasing 'health'\n    // TODO: Set 'h' to 0 via the reference\n    // TODO: Print 'health' and verify it changed\n    \n    return 0;\n}"
                    }
                ],
                quiz: [
                    { question: "What is the primary cause of a Buffer Overflow vulnerability?", options: ["Writing data outside the allocated bounds of an array", "Using too many loops", "Failing to compile", "A syntax error in the code"], correctAnswer: 0 },
                    { question: "Which memory region is automatically managed by the CPU and used for local variables?", options: ["The Heap", "The Stack", "The Virtual Drive", "The Register File"], correctAnswer: 1 },
                    { question: "What keyword is used to allocate memory on the Heap?", options: ["allocate", "malloc", "new", "create"], correctAnswer: 2 },
                    { question: "What happens if you allocate Heap memory but forget to use 'delete'?", options: ["A Stack Overflow", "A Memory Leak", "A Compiler Error", "The OS automatically deletes it"], correctAnswer: 1 },
                    { question: "If 'ptr' is an int* pointing to address 1000, what is the address of 'ptr + 1' (assuming 4-byte integers)?", options: ["1001", "1002", "1004", "1008"], correctAnswer: 2 },
                    { question: "Which statement is true regarding References in C++?", options: ["They can be reassigned after declaration", "They can be NULL", "They must be initialized upon declaration", "They are slower than pointers"], correctAnswer: 2 },
                    { question: "What is a Dangling Pointer?", options: ["A pointer that is not initialized", "A pointer referencing an array", "A pointer to memory that has already been freed", "A pointer with no data type"], correctAnswer: 2 },
                    { question: "Why do we set deleted pointers to 'nullptr'?", options: ["To free memory faster", "To optimize CPU usage", "To prevent accidental access to already-freed memory", "To close the application"], correctAnswer: 2 },
                    { question: "What data structure uses a Last-In-First-Out (LIFO) principle?", options: ["Heap", "Array", "Stack", "Queue"], correctAnswer: 2 },
                    { question: "Which operator accesses the value a pointer is pointing to?", options: ["Using the '&' operator", "Using the '*' operator", "Using the '->' operator", "Using the 'new' keyword"], correctAnswer: 1 }
                ]
            },
            {
                moduleId: 3,
                moduleName: "Module 3: Object-Oriented Design & Security",
                moduleDescription: "Advanced OOP concepts including encapsulation, inheritance, polymorphism, and secure architecture",
                lessons: [
                    {
                        id: 11,
                        title: "Classes & Object-Oriented Architecture",
                        difficulty: "Advanced",
                        estimatedTime: "60 min",
                        keyTerms: ["Class", "Object", "Encapsulation", "Access Modifiers", "Member Functions"],
                        theory: `
                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Object-Oriented Programming Paradigm</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Object-Oriented Programming (OOP) models software as collections of <strong>Objects</strong> that interact with each other, each holding <strong>state (data)</strong> and <strong>behavior (methods)</strong>.</p>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Classes as Blueprints</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">A <strong>Class</strong> is a template that defines the structure and behavior of objects. It specifies:</p>
                            <ul style="margin-bottom: 15px; color: #d1d5db; padding-left: 20px; list-style-type: disc;">
                                <li style="margin-bottom: 8px;"><strong>Member Variables:</strong> Data that each object instance holds</li>
                                <li style="margin-bottom: 8px;"><strong>Member Functions:</strong> Methods that operate on instance data</li>
                                <li style="margin-bottom: 8px;"><strong>Access Modifiers:</strong> Controls visibility and mutability</li>
                            </ul>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Access Modifiers</h3>
                            <table style="width: 100%; margin-bottom: 15px; border-collapse: collapse; color: #d1d5db;">
                                <tr style="background: rgba(74, 110, 224, 0.1); border-bottom: 1px solid rgba(74, 110, 224, 0.2);">
                                    <td style="padding: 10px; font-weight: bold; color: #4a6ee0;">Modifier</td>
                                    <td style="padding: 10px; font-weight: bold; color: #4a6ee0;">Class</td>
                                    <td style="padding: 10px; font-weight: bold; color: #4a6ee0;">Subclass</td>
                                    <td style="padding: 10px; font-weight: bold; color: #4a6ee0;">Outside</td>
                                </tr>
                                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                                    <td style="padding: 10px; color: #00d527;"><strong>public</strong></td>
                                    <td style="padding: 10px;">✓ Access</td>
                                    <td style="padding: 10px;">✓ Access</td>
                                    <td style="padding: 10px;">✓ Access</td>
                                </tr>
                                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                                    <td style="padding: 10px; color: #ffca2c;"><strong>protected</strong></td>
                                    <td style="padding: 10px;">✓ Access</td>
                                    <td style="padding: 10px;">✓ Access</td>
                                    <td style="padding: 10px;">✗ Hidden</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; color: #ff4b4b;"><strong>private</strong></td>
                                    <td style="padding: 10px;">✓ Access</td>
                                    <td style="padding: 10px;">✗ Hidden</td>
                                    <td style="padding: 10px;">✗ Hidden</td>
                                </tr>
                            </table>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">This Pointer</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Inside a member function, the <span style="font-family: monospace; background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 3px;">this</span> pointer refers to the current object. It allows disambiguation and enables method chaining.</p>
                        `,
                        codeExample: "class Server {\nprivate:\n    std::string ip_address;\n    int port;\n    \npublic:\n    // Constructor\n    Server(const std::string& ip, int p) : ip_address(ip), port(p) {}\n    \n    // Member function\n    void connect() {\n        std::cout << \"Connecting to \" << this->ip_address << \":\" << port;\n    }\n    \n    // Getter for private data\n    std::string getIP() const { return ip_address; }\n};\n\nint main() {\n    Server db(\"192.168.1.1\", 3306);\n    db.connect();  // Calls member function\n}",
                        codeExplanation: "Classes bundle data and operations. Access modifiers enforce the contract: private data is accessed through public interfaces, enabling validation.",
                        bestPractices: [
                            "Use public methods to expose interface, private for implementation",
                            "Initialize member variables in constructor initializer lists",
                            "Mark const methods that don't modify state",
                            "Use getters/setters for controlled access to private data"
                        ],
                        startingCode: "#include <iostream>\nusing namespace std;\n\n// TODO: Create a class 'User' with private member 'name'\n// TODO: Provide public getter and constructor\n\nint main() {\n    // User obj(\"Alice\");\n    // cout << obj.getName();\n    return 0;\n}"
                    },
                    {
                        id: 12,
                        title: "Encapsulation & Defensive Programming",
                        difficulty: "Advanced",
                        estimatedTime: "55 min",
                        keyTerms: ["Encapsulation", "Data Hiding", "Getter/Setter", "Validation", "Invariants"],
                        theory: `
                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Encapsulation Principle</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;"><strong>Encapsulation</strong> hides internal state and forces all modifications through a controlled interface. This acts as a security checkpoint.</p>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Class Invariants</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">A <strong>Class Invariant</strong> is a property that must remain true for every instance. Encapsulation ensures invariants cannot be violated by external code.</p>

                            <div style="background: rgba(0, 213, 39, 0.15); border-left: 4px solid #00d527; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #00d527; font-weight: bold; margin-bottom: 10px;">🛡️ Security Benefit: Input Validation</p>
                                <p style="color: #d1d5db; line-height: 1.6;">Setter functions can validate data before modification. Example: A password field can enforce minimum length, complexity requirements, and block common weak passwords—preventing injection attacks.</p>
                            </div>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Defensive Programming Strategy</h3>
                            <ul style="margin-bottom: 15px; color: #d1d5db; padding-left: 20px; list-style-type: disc;">
                                <li style="margin-bottom: 8px;"><strong>Validate All Inputs:</strong> Check bounds, type, and format</li>
                                <li style="margin-bottom: 8px;"><strong>Enforce Invariants:</strong> Ensure class state remains valid</li>
                                <li style="margin-bottom: 8px;"><strong>Fail Securely:</strong> Reject invalid operations, don't corrupt state</li>
                                <li style="margin-bottom: 8px;"><strong>Principle of Least Privilege:</strong> Grant minimal necessary access</li>
                                <li style="margin-bottom: 8px;"><strong>Defense in Depth:</strong> Multiple validation layers</li>
                            </ul>
                        `,
                        codeExample: "class BankAccount {\nprivate:\n    double balance = 0.0;\n    std::string password;\n    \n    bool validatePassword(const std::string& pwd) {\n        return pwd.length() >= 8 && pwd.find_first_of(\"0123456789\") != std::string::npos;\n    }\n    \npublic:\n    bool setPassword(const std::string& newPwd) {\n        if (!validatePassword(newPwd)) {\n            std::cerr << \"Password must be 8+ chars with numbers\\n\";\n            return false;\n        }\n        password = newPwd;\n        return true;\n    }\n    \n    bool withdraw(double amount) {\n        if (amount <= 0 || amount > balance) {\n            std::cerr << \"Invalid withdrawal amount\\n\";\n            return false;\n        }\n        balance -= amount;\n        return true;\n    }\n    \n    double getBalance() const { return balance; }\n};",
                        codeExplanation: "Encapsulated data cannot violate invariants. External code cannot set <span style=\"font-family: monospace;\">balance</span> to negative or password to empty.",
                        bestPractices: [
                            "Validate in setters, not getters",
                            "Log validation failures for security audit trails",
                            "Use strong types (not string for everything)",
                            "Define what constitutes invalid state and prevent it"
                        ],
                        startingCode: "#include <iostream>\n#include <string>\nusing namespace std;\n\n// TODO: Create Account class with encrypted password field\n// TODO: Implement setter with password strength validation\n// TODO: Prevent direct access to sensitive data\n\nint main() {\n    return 0;\n}"
                    },
                    {
                        id: 13,
                        title: "Constructors, Destructors & RAII",
                        difficulty: "Advanced",
                        estimatedTime: "55 min",
                        keyTerms: ["Constructor", "Destructor", "RAII", "Resource Management", "Initialization"],
                        theory: `
                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">The Constructor</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">A <strong>Constructor</strong> is a special member function invoked automatically upon object creation. It initializes the object to a valid state.</p>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Constructor Types</h3>
                            <ul style="margin-bottom: 15px; color: #d1d5db; padding-left: 20px; list-style-type: disc;">
                                <li style="margin-bottom: 8px;"><strong>Default Constructor:</strong> Takes no parameters, initializes with default values</li>
                                <li style="margin-bottom: 8px;"><strong>Parameterized Constructor:</strong> Accepts arguments for customized initialization</li>
                                <li style="margin-bottom: 8px;"><strong>Copy Constructor:</strong> Creates a new object as a copy of another</li>
                                <li style="margin-bottom: 8px;"><strong>Move Constructor:</strong> Efficiently transfers ownership of resources (C++11+)</li>
                            </ul>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">The Destructor</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">A <strong>Destructor</strong> (prefixed with <span style="font-family: monospace; background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 3px;">~</span>) executes automatically when an object is destroyed, cleaning up resources.</p>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">RAII: Resource Acquisition Is Initialization</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;"><strong>RAII</strong> is the core design pattern of modern C++. It ties resource lifecycle to object lifetime:</p>
                            <ul style="margin-bottom: 15px; color: #d1d5db; padding-left: 20px; list-style-type: disc;">
                                <li style="margin-bottom: 8px;">Resources acquired in constructor</li>
                                <li style="margin-bottom: 8px;">Resources released in destructor</li>
                                <li style="margin-bottom: 8px;">Automatic cleanup on scope exit (no manual management)</li>
                            </ul>

                            <div style="background: rgba(0, 213, 39, 0.15); border-left: 4px solid #00d527; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #00d527; font-weight: bold; margin-bottom: 10px;">✨ RAII Advantages</p>
                                <p style="color: #d1d5db; line-height: 1.6; margin-bottom: 10px;">Prevents resource leaks even if exceptions occur. The destructor executes regardless of how the scope exits (return, exception, etc.).</p>
                                <p style="color: #d1d5db; line-height: 1.6; margin: 0;"><strong>Example:</strong> File handle closes automatically when FileStream object goes out of scope.</p>
                            </div>
                        `,
                        codeExample: "class FileStream {\nprivate:\n    FILE* handle;\n    \npublic:\n    // Constructor - acquires resource\n    FileStream(const char* filename) {\n        handle = fopen(filename, \"r\");\n        if (!handle) throw std::runtime_error(\"File open failed\");\n    }\n    \n    // Destructor - releases resource\n    ~FileStream() {\n        if (handle) fclose(handle);\n    }\n    \n    // Delete copy to prevent double-close\n    FileStream(const FileStream&) = delete;\n};\n\nvoid processFile() {\n    FileStream file(\"data.txt\");  // Constructor\n    // Use file...\n} // Destructor executes automatically, closes file safely",
                        codeExplanation: "RAII ensures cleanup happens automatically, whether the function returns normally or throws an exception. Modern equivalent: std::ifstream (file automatically closes).",
                        bestPractices: [
                            "Always define destructors when holding dynamic memory or system resources",
                            "Use initializer lists for efficient member initialization",
                            "Define move constructor/assignment for optimal resource transfer",
                            "Modern C++: Use std::unique_ptr, std::shared_ptr, smart pointers"
                        ],
                        startingCode: "#include <iostream>\nusing namespace std;\n\n// TODO: Create a class with constructor printing \"Resource acquired\"\n// TODO: Create a destructor printing \"Resource released\"\n\nint main() {\n    { \n        // Object created here, destroyed at block end\n    }\n    return 0;\n}"
                    },
                    {
                        id: 14,
                        title: "Inheritance & Code Reusability",
                        difficulty: "Advanced",
                        estimatedTime: "60 min",
                        keyTerms: ["Inheritance", "Base Class", "Derived Class", "Protected", "IS-A Relationship"],
                        theory: `
                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Inheritance Concept</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;"><strong>Inheritance</strong> allows a new class (Derived) to extend an existing class (Base), absorbing its attributes and methods while adding specialization.</p>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">IS-A vs HAS-A Relationships</h3>
                            <ul style="margin-bottom: 15px; color: #d1d5db; padding-left: 20px; list-style-type: disc;">
                                <li style="margin-bottom: 8px;"><strong>IS-A (Inheritance):</strong> A Dog IS-A Animal. Use inheritance.</li>
                                <li style="margin-bottom: 8px;"><strong>HAS-A (Composition):</strong> A Car HAS-A Engine. Use member variables.</li>
                            </ul>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Inheritance Hierarchy</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6; font-family: monospace; background: rgba(255,255,255,0.05); padding: 10px; border-radius: 4px;">
                                Animal (Base)<br/>
                                  ├─ Dog : public Animal<br/>
                                  ├─ Cat : public Animal<br/>
                                  └─ Bird : public Animal
                            </p>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Access Modes in Inheritance</h3>
                            <table style="width: 100%; margin-bottom: 15px; border-collapse: collapse; color: #d1d5db;">
                                <tr style="background: rgba(74, 110, 224, 0.1); border-bottom: 1px solid rgba(74, 110, 224, 0.2);">
                                    <td style="padding: 10px; font-weight: bold; color: #4a6ee0;">Base Member</td>
                                    <td style="padding: 10px; font-weight: bold; color: #4a6ee0;">public Inherit</td>
                                    <td style="padding: 10px; font-weight: bold; color: #4a6ee0;">protected Inherit</td>
                                    <td style="padding: 10px; font-weight: bold; color: #4a6ee0;">private Inherit</td>
                                </tr>
                                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                                    <td style="padding: 10px;">public</td>
                                    <td style="padding: 10px;">public</td>
                                    <td style="padding: 10px;">protected</td>
                                    <td style="padding: 10px;">private</td>
                                </tr>
                                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                                    <td style="padding: 10px;">protected</td>
                                    <td style="padding: 10px;">protected</td>
                                    <td style="padding: 10px;">protected</td>
                                    <td style="padding: 10px;">private</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px;">private</td>
                                    <td style="padding: 10px;">inaccessible</td>
                                    <td style="padding: 10px;">inaccessible</td>
                                    <td style="padding: 10px;">inaccessible</td>
                                </tr>
                            </table>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Benefits & DRY Principle</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Don't Repeat Yourself (DRY). Common functionality lives in the base class, derived classes focus on specialization.</p>
                        `,
                        codeExample: "// Base class\nclass Malware {\nprotected:\n    std::string targetIP;\n    \npublic:\n    Malware(const std::string& ip) : targetIP(ip) {}\n    virtual void infect() { std::cout << \"System Compromised\"; }\n};\n\nclass Ransomware : public Malware {\npublic:\n    Ransomware(const std::string& ip) : Malware(ip) {}\n    \n    void infect() override {  // Override base implementation\n        Malware::infect();    // Call parent method\n        encrypt();\n    }\n    \n    void encrypt() { std::cout << \"Files Locked.\"; }\n};\n\nint main() {\n    Ransomware threat(\"192.168.1.1\");\n    threat.infect();  // Calls Ransomware::infect()\n}",
                        codeExplanation: "Derived class inherits all public and protected members from base. The <span style=\"font-family: monospace;\">override</span> keyword ensures correct virtual function overriding.",
                        bestPractices: [
                            "Use public inheritance for IS-A relationships",
                            "Mark base class methods virtual if expecting override",
                            "Use override keyword to catch mistakes at compile time",
                            "Prefer composition over inheritance when applicable"
                        ],
                        startingCode: "#include <iostream>\nusing namespace std;\n\n// TODO: Create Animal base class with virtual method\n// TODO: Create Dog derived class inheriting from Animal\n\nint main() {\n    return 0;\n}"
                    },
                    {
                        id: 15,
                        title: "Polymorphism & Virtual Functions",
                        difficulty: "Advanced",
                        estimatedTime: "60 min",
                        keyTerms: ["Polymorphism", "Virtual Function", "Dynamic Binding", "vtable", "Type Hierarchy"],
                        theory: `
                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Polymorphism Definition</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;"><strong>Polymorphism</strong> means "many forms." It allows objects of different derived types to be processed through a uniform base class interface.</p>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Static vs Dynamic Binding</h3>
                            <ul style="margin-bottom: 15px; color: #d1d5db; padding-left: 20px; list-style-type: disc;">
                                <li style="margin-bottom: 8px;"><strong>Static Binding (Compile-time):</strong> Function resolved based on pointer type, not object type</li>
                                <li style="margin-bottom: 8px;"><strong>Dynamic Binding (Runtime):</strong> Function resolved based on actual object type (virtual functions)</li>
                            </ul>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Virtual Functions</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">The <span style="font-family: monospace; background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 3px;">virtual</span> keyword enables dynamic binding. Each class with virtual functions has a hidden <strong>Virtual Method Table (vtable)</strong>.</p>

                            <div style="background: rgba(74, 110, 224, 0.15); border-left: 4px solid #4a6ee0; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #4a6ee0; font-weight: bold; margin-bottom: 10px;">🔧 How Virtual Functions Work</p>
                                <p style="margin-bottom: 10px; color: #d1d5db; line-height: 1.6;">Each object stores a pointer to its class's vtable. When a virtual function is called through a base pointer/reference, the CPU:</p>
                                <p style="margin: 0; color: #d1d5db; font-family: monospace;">
                                    1. Reads vtable pointer from object<br/>
                                    2. Looks up function address in vtable<br/>
                                    3. Calls the derived class's function
                                </p>
                            </div>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Pure Virtual Functions & Abstract Classes</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">A <strong>Pure Virtual Function</strong> (= 0) has no implementation. Classes containing pure virtual functions are abstract and cannot be instantiated.</p>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Real-World Applications</h3>
                            <ul style="margin-bottom: 15px; color: #d1d5db; padding-left: 20px; list-style-type: disc;">
                                <li style="margin-bottom: 8px;">Game engines: Different entity types (Player, Enemy, NPC) share common interface</li>
                                <li style="margin-bottom: 8px;">Graphics: Base Shape class, derived Circle, Rectangle, Triangle</li>
                                <li style="margin-bottom: 8px;">Plugin systems: Plugins implement interface, host calls through base pointers</li>
                                <li style="margin-bottom: 8px;">Event handling: Base Event class, derived MouseEvent, KeyboardEvent</li>
                            </ul>

                            <div style="background: rgba(0, 213, 39, 0.15); border-left: 4px solid #00d527; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #00d527; font-weight: bold; margin-bottom: 10px;">✅ C++ Mastery Milestone</p>
                                <p style="color: #d1d5db; margin: 0;">You now possess comprehensive C++ mastery spanning low-level memory manipulation, object-oriented architecture, and secure systems programming. Ready for advanced roles in systems development, cybersecurity, and performance-critical applications.</p>
                            </div>
                        `,
                        codeExample: "// Abstract base class with pure virtual function\nclass Entity {\npublic:\n    virtual void update(float dt) = 0;  // Pure virtual\n    virtual ~Entity() {}                 // Virtual destructor\n};\n\nclass Player : public Entity {\npublic:\n    void update(float dt) override {\n        std::cout << \"Player moving...\\n\";\n    }\n};\n\nclass Enemy : public Entity {\npublic:\n    void update(float dt) override {\n        std::cout << \"Enemy attacking...\\n\";\n    }\n};\n\nint main() {\n    std::vector<Entity*> entities;\n    entities.push_back(new Player());\n    entities.push_back(new Enemy());\n    \n    // Polymorphic behavior\n    for (auto entity : entities) {\n        entity->update(0.016f);  // Calls appropriate derived function\n    }\n}",
                        codeExplanation: "Polymorphism allows uniform handling of diverse types. The actual function called depends on the object's runtime type, not the pointer type.",
                        bestPractices: [
                            "Always define virtual destructors in base classes",
                            "Use override keyword in derived classes (prevents mistakes)",
                            "Prefer pure virtual functions for abstract interfaces",
                            "Remember: vtables add 8 bytes per object (x64) and one vtable lookup cost"
                        ],
                        startingCode: "#include <iostream>\n#include <vector>\nusing namespace std;\n\n// TODO: Create abstract Shape class with pure virtual area()\n// TODO: Create Circle and Square derived classes\n// TODO: Store in vector and polymorphically calculate areas\n\nint main() {\n    return 0;\n}"
                    }
                ],
                quiz: [
                    { question: "What is Encapsulation?", options: ["Making all variables public", "Hiding internal data and restricting access via methods", "Deleting objects from memory", "Inheriting from multiple classes"], correctAnswer: 1 },
                    { question: "Which keyword specifies members accessible ONLY within the class?", options: ["public", "protected", "private", "virtual"], correctAnswer: 2 },
                    { question: "What is a Constructor?", options: ["A method that destroys objects", "A method automatically called upon object instantiation", "A variable holding memory", "A keyword for inheritance"], correctAnswer: 1 },
                    { question: "Which character designates a Destructor?", options: ["*", "&", "~", "!"], correctAnswer: 2 },
                    { question: "What does 'protected' allow?", options: ["Access by anything", "Access within class and derived classes only", "No access at all", "Access only by pointers"], correctAnswer: 1 },
                    { question: "Which keyword enables runtime function resolution?", options: ["static", "virtual", "const", "inline"], correctAnswer: 1 },
                    { question: "What does RAII stand for?", options: ["Random Access Is Impossible", "Read And Initialize Instantly", "Resource Acquisition Is Initialization", "Return Array Index Integer"], correctAnswer: 2 },
                    { question: "How is public inheritance denoted?", options: ["class B inherits A", "class B :: A", "class B : public A", "class B -> A"], correctAnswer: 2 },
                    { question: "What is Polymorphism's primary benefit?", options: ["Uses less memory", "Allows uniform interface for diverse types", "Prevents buffer overflows", "Automatically cleans memory"], correctAnswer: 1 },
                    { question: "Why validate data in setter methods?", options: ["It speeds up programs", "Prevents invalid states and injection attacks", "Prints data to console", "Replaces constructors"], correctAnswer: 1 }
                ]
            },
            {
                moduleId: 4,
                moduleName: "Module 4: Advanced C++ & Modern Features",
                moduleDescription: "Templates, move semantics, exception handling, and C++20 features",
                lessons: [
                    {
                        id: 16,
                        title: "Templates & Generic Programming",
                        difficulty: "Advanced",
                        estimatedTime: "65 min",
                        keyTerms: ["Templates", "Generics", "Template Specialization", "Template Metaprogramming"],
                        theory: `
                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Templates: Write Once, Compile Many</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Templates enable writing generic code that works with any type. The compiler instantiates separate versions for each type at compile-time. Zero runtime overhead.</p>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Function Templates</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Write one function, automatically works with multiple types. Compiler generates type-specific versions.</p>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Class Templates</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Create flexible data structures like Vector<T>, Stack<T>, Queue<T> that work with any type.</p>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Template Specialization</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Provide optimized implementations for specific types. Example: specialized version for bool uses bit packing.</p>

                            <div style="background: rgba(0, 213, 39, 0.15); border-left: 4px solid #00d527; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #00d527; font-weight: bold; margin-bottom: 10px;">⚡ Power & Complexity</p>
                                <p style="color: #d1d5db; line-height: 1.6; margin: 0;">Templates are powerful but can lead to long compilation times and cryptic error messages. Modern C++ prefers Concepts for constraints.</p>
                            </div>
                        `,
                        codeExample: "// Function template\ntemplate<typename T>\nT maximum(T a, T b) {\n    return (a > b) ? a : b;\n}\n\n// Class template\ntemplate<typename T>\nclass Stack {\nprivate:\n    std::vector<T> data;\npublic:\n    void push(const T& value) { data.push_back(value); }\n    T pop() {\n        if (data.empty()) throw std::underflow_error(\"Stack empty\");\n        T value = data.back();\n        data.pop_back();\n        return value;\n    }\n};\n\nint main() {\n    std::cout << maximum(5, 10) << std::endl;      // 10\n    std::cout << maximum(3.5, 2.1) << std::endl;   // 3.5\n    \n    Stack<int> intStack;\n    intStack.push(42);\n    Stack<std::string> stringStack;\n    stringStack.push(\"Hello\");\n}",
                        codeExplanation: "Compiler generates separate code for each type. No runtime polymorphism overhead.",
                        bestPractices: [
                            "Keep template implementations in headers",
                            "Document template requirements clearly",
                            "Use static_assert for compile-time checks",
                            "Consider Concepts (C++20) for template constraints"
                        ],
                        startingCode: "// TODO: Create a generic swap template\n// TODO: Create a generic Vector template\n// TODO: Test with multiple types"
                    },
                    {
                        id: 17,
                        title: "Move Semantics & RValue References",
                        difficulty: "Advanced",
                        estimatedTime: "60 min",
                        keyTerms: ["Move Semantics", "RValue", "Perfect Forwarding", "Move Constructor"],
                        theory: `
                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">The Copy Problem</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Copying large objects (vectors, strings) is expensive. Modern C++ enables efficient resource transfer via move semantics.</p>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">LValue vs RValue</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;"><strong>LValue:</strong> Variable with persistent identity. <strong>RValue:</strong> Temporary object without persistent identity.</p>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Move Constructor</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Efficiently transfers ownership of resources from temporary object. Avoids expensive copying.</p>

                            <div style="background: rgba(0, 213, 39, 0.15); border-left: 4px solid #00d527; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #00d527; font-weight: bold; margin-bottom: 10px;">🚀 Performance Revolution</p>
                                <p style="color: #d1d5db; line-height: 1.6; margin: 0;">Move semantics enable efficient resource management without runtime overhead. Critical for high-performance C++.</p>
                            </div>
                        `,
                        codeExample: "class String {\nprivate:\n    char* data;\n    size_t length;\npublic:\n    // Copy constructor\n    String(const String& other) {\n        length = other.length;\n        data = new char[length + 1];\n        std::strcpy(data, other.data);\n    }\n    \n    // Move constructor (C++11)\n    String(String&& other) noexcept : data(other.data), length(other.length) {\n        other.data = nullptr;  // Steal resources\n        other.length = 0;\n    }\n    \n    ~String() { delete[] data; }\n};\n\nint main() {\n    String s1(\"Hello\");         // Creates\n    String s2 = std::move(s1);  // Moves, not copies!\n}",
                        codeExplanation: "Move constructor transfers ownership instead of copying. Much faster for large objects.",
                        bestPractices: [
                            "Define move constructor/assignment for classes managing resources",
                            "Mark move functions with noexcept",
                            "Use std::move() to explicitly move when needed",
                            "std::unique_ptr provides RAII with move semantics"
                        ],
                        startingCode: "// TODO: Implement move constructor for Vector\n// TODO: Implement move assignment operator\n// TODO: Benchmark copy vs move performance"                  },
                    {
                        id: 10,
                        title: "Cryptography: Symmetric, Asymmetric & Hashing",
                        difficulty: "Advanced",
                        estimatedTime: "70 min",
                        keyTerms: ["AES-256", "RSA", "Diffie-Hellman", "SHA-256", "HMAC", "Perfect Forward Secrecy"],
                        theory: `
                            <h3 style="color: #e84040; margin-bottom: 12px;">Cryptography Fundamentals</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Cryptography is the mathematical foundation of all security. Three pillars: <strong>Symmetric (AES)</strong> for fast bulk encryption, <strong>Asymmetric (RSA)</strong> for key exchange and digital signatures, and <strong>Hashing (SHA-256)</strong> for integrity and passwords.</p>

                            <h3 style="color: #e84040; margin-bottom: 12px;">Symmetric vs Asymmetric</h3>
                            <table style="width:100%; border-collapse:collapse; color:#d1d5db; margin-bottom:15px; font-size:13px;">
                                <tr style="background:rgba(232,64,64,0.1);">
                                    <td style="padding:9px; color:#e84040; font-weight:bold;">Property</td>
                                    <td style="padding:9px; color:#e84040; font-weight:bold;">Symmetric (AES-256)</td>
                                    <td style="padding:9px; color:#e84040; font-weight:bold;">Asymmetric (RSA)</td>
                                </tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                                    <td style="padding:9px;">Speed</td>
                                    <td style="padding:9px; color:#00d527;">~1GB/s</td>
                                    <td style="padding:9px; color:#ffca2c;">~1MB/s</td>
                                </tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                                    <td style="padding:9px;">Key Size</td>
                                    <td style="padding:9px;">256 bits</td>
                                    <td style="padding:9px;">2048-4096 bits</td>
                                </tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                                    <td style="padding:9px;">Key Exchange</td>
                                    <td style="padding:9px; color:#ff4b4b;">Pre-shared</td>
                                    <td style="padding:9px; color:#00d527;">Public distribution</td>
                                </tr>
                                <tr>
                                    <td style="padding:9px;">Signatures</td>
                                    <td style="padding:9px;">HMAC only</td>
                                    <td style="padding:9px; color:#00d527;">True digital signatures</td>
                                </tr>
                            </table>

                            <h3 style="color: #e84040; margin-bottom: 12px;">TLS 1.3 Handshake: Modern Encryption</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; font-family: monospace; background: rgba(255,255,255,0.05); padding: 10px; border-radius: 4px; line-height: 1.8;">
                                Client → Server: ClientHello (supported ciphers, curves)<br/>
                                Server → Client: ServerHello (chosen suite) + ServerCertificate<br/>
                                ─── Key Exchange (ECDHE) ───<br/>
                                Both derive shared secret (Diffie-Hellman)<br/>
                                ─── All subsequent data encrypted ───<br/>
                                Perfect Forward Secrecy: Past session keys unrecoverable even if private key leaked
                            </p>

                            <div style="background: rgba(232,64,64,0.15); border-left: 4px solid #e84040; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #e84040; font-weight: bold; margin-bottom: 8px;">🔐 Cryptographic Primitives</p>
                                <p style="color: #d1d5db; margin: 0;"><strong>AES-GCM:</strong> Symmetric encryption with authentication (AEAD). <strong>HMAC-SHA256:</strong> Message authentication for integrity + authenticity. <strong>ECDSA:</strong> Digital signatures with smaller key sizes than RSA.</p>
                            </div>`,
                        codeExample: `from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives import hashes, hmac
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives import serialization
import os

# AES-256-GCM: Authenticated Encryption
def encrypt_message(plaintext: bytes, key: bytes) -> tuple[bytes, bytes, bytes]:
    """Encrypt with AES-256-GCM. Returns (ciphertext, nonce, tag)."""
    if len(key) != 32:
        raise ValueError("Key must be 32 bytes")
    
    nonce = os.urandom(12)  # 96-bit nonce
    cipher = Cipher(
        algorithms.AES(key),
        modes.GCM(nonce),
        backend=None
    )
    encryptor = cipher.encryptor()
    ciphertext = encryptor.update(plaintext) + encryptor.finalize()
    return ciphertext, nonce, encryptor.tag

def decrypt_message(ciphertext: bytes, key: bytes, nonce: bytes, tag: bytes) -> bytes:
    """Decrypt AES-256-GCM. Verifies authenticity via tag."""
    cipher = Cipher(
        algorithms.AES(key),
        modes.GCM(nonce, tag),
        backend=None
    )
    decryptor = cipher.decryptor()
    return decryptor.update(ciphertext) + decryptor.finalize()

# HMAC for message authentication
def compute_hmac(message: bytes, key: bytes) -> bytes:
    """Create HMAC-SHA256 for integrity verification."""
    h = hmac.HMAC(key, hashes.SHA256())
    h.update(message)
    return h.finalize()

def verify_hmac(message: bytes, key: bytes, signature: bytes) -> bool:
    """Verify HMAC constant-time."""
    h = hmac.HMAC(key, hashes.SHA256())
    h.update(message)
    try:
        h.verify(signature)
        return True
    except:
        return False

# RSA: Asymmetric encryption and signatures
def generate_rsa_keypair(bits: int = 2048) -> tuple:
    """Generate RSA keypair."""
    private_key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=bits
    )
    return private_key, private_key.public_key()

def sign_message(message: bytes, private_key) -> bytes:
    """Create digital signature with RSA."""
    signature = private_key.sign(
        message,
        padding.PSS(
            mgf=padding.MGF1(hashes.SHA256()),
            salt_length=padding.PSS.MAX_LENGTH
        ),
        hashes.SHA256()
    )
    return signature

def verify_signature(message: bytes, signature: bytes, public_key) -> bool:
    """Verify RSA-PSS signature."""
    try:
        public_key.verify(
            signature,
            message,
            padding.PSS(
                mgf=padding.MGF1(hashes.SHA256()),
                salt_length=padding.PSS.MAX_LENGTH
            ),
            hashes.SHA256()
        )
        return True
    except:
        return False`,
                        codeExplanation: "GCM mode provides authenticated encryption (AEAD) — detects tampering. RSA-PSS uses probabilistic padding — same message produces different signatures (good for security). Always use constant-time verification for HMAC/signatures.",
                        bestPractices: [
                            "Use AES-256-GCM for all symmetric encryption — never ECB or unauthed CBC",
                            "Generate 256-bit keys from passwords using Argon2 or PBKDF2 (not raw password)",
                            "Use TLS 1.3 only — disable older versions (1.2 and below have breaks)",
                            "Rotate encryption keys annually — implement key versioning for seamless rotation",
                            "Never implement crypto yourself — use proven libraries (cryptography, libsodium)"
                        ],
                        startingCode: `from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
import os

# TODO: Implement AES-256-GCM encryption for a message
# TODO: Create HMAC-SHA256 for integrity verification
# TODO: Generate RSA keypair and sign a message
# TODO: Verify the signature
# TODO: Demonstrate that tampering with ciphertext fails verification

def secure_message_send(message: str, recipient_public_key):
    pass

def secure_message_receive(encrypted_data: bytes, private_key):
    pass`
                    }
                ],
                quiz: [
                    { question: "What is SSRF?", options: ["Server-Side Request Forgery — makes server access internal resources", "Secure Socket Response Format", "Session State Request Framework", "System Security Failure Recovery"], correctAnswer: 0 },
                    { question: "What does IDOR stand for?", options: ["Insecure Direct Object Reference", "Internal Data Object Registry", "Internet Direct Order Request", "Infrastructure Deployment Operational Review"], correctAnswer: 0 },
                    { question: "What is the primary purpose of rate limiting on APIs?", options: ["Improve performance", "Prevent resource exhaustion and brute force attacks", "Encrypt data", "Authenticate users"], correctAnswer: 1 },
                    { question: "Which algorithm is best for password hashing?", options: ["MD5", "SHA-256", "bcrypt or Argon2id", "AES-256"], correctAnswer: 2 },
                    { question: "What vulnerability does specifying algorithms=[ALGORITHM] in JWT verification prevent?", options: ["Token expiration", "Algorithm confusion attacks", "Rate limiting bypass", "SSRF"], correctAnswer: 1 },
                    { question: "What is Perfect Forward Secrecy?", options: ["Passwords are never stored", "Past session keys remain secure even if private key is leaked", "All encryption uses RSA", "TLS is disabled"], correctAnswer: 1 },
                    { question: "Which symmetric cipher should NOT be used?", options: ["AES-GCM", "ChaCha20-Poly1305", "AES-ECB", "AES-CBC with HMAC"], correctAnswer: 2 },
                    { question: "What is HMAC used for?", options: ["Encryption", "Message authentication and integrity verification", "Key generation", "Password hashing"], correctAnswer: 1 },
                    { question: "What does RSA-PSS padding provide?", options: ["Faster computation", "Probabilistic encryption — same message produces different ciphertexts", "Longer signatures", "Backwards compatibility"], correctAnswer: 1 },
                    { question: "What is the recommended TLS version?", options: ["TLS 1.0", "TLS 1.2", "TLS 1.3", "SSL 3.0"], correctAnswer: 2 }
                ]
            },
            {
                moduleId: 3,
                moduleName: "Module 3: Advanced Offense & Defense",
                moduleDescription: "Privilege escalation, exploit development, incident response, and purple teaming",
                lessons: [
                    {
                        id: 11,
                        title: "Privilege Escalation: Local & Remote",
                        difficulty: "Advanced",
                        estimatedTime: "70 min",
                        keyTerms: ["Privilege Escalation", "Kernel Exploit", "SUID Abuse", "DLL Hijacking", "UAC Bypass", "CVE Automation"],
                        theory: `
                            <h3 style="color: #e84040; margin-bottom: 12px;">Privilege Escalation Attack Tree</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">After initial access as low-privilege user, the next goal is escalating to administrator/root. Common paths: SUID binaries with logic flaws, kernel vulnerabilities (CVE), weak sudo configs, misconfigured services running as root.</p>

                            <h3 style="color: #e84040; margin-bottom: 12px;">Windows Privilege Escalation</h3>
                            <ul style="margin-bottom: 15px; color: #d1d5db; padding-left: 20px; list-style-type: disc;">
                                <li style="margin-bottom: 8px;"><strong style="color:#ff4b4b;">Token Impersonation:</strong> SeImpersonate privilege allows impersonating other users' tokens.</li>
                                <li style="margin-bottom: 8px;"><strong style="color:#ff4b4b;">Unquoted Service Paths:</strong> Program Files/My App.exe → service loads My.exe if it exists (DLL hijacking).</li>
                                <li style="margin-bottom: 8px;"><strong style="color:#ffca2c;">UAC Bypass:</strong> Exploiting auto-elevate binaries (fodhelper.exe, eventvwr.exe).</li>
                                <li style="margin-bottom: 8px;"><strong style="color:#ffca2c;">Kernel Exploit:</strong> CVE in ntdll or drivers elevates to SYSTEM.</li>
                            </ul>

                            <div style="background: rgba(232,64,64,0.15); border-left: 4px solid #e84040; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #e84040; font-weight: bold; margin-bottom: 8px;">🎯 Methodology</p>
                                <p style="color: #d1d5db; margin: 0;"><strong>1. Enumeration:</strong> whoami, id, sudo -l, groups, capabilities, systemctl --failed. <strong>2. Exploit Research:</strong> Does a known CVE apply to this kernel version? <strong>3. Execution:</strong> Upload/compile exploit, execute. <strong>4. Persistence:</strong> Add backdoor access before maintaining foothold.</p>
                            </div>`,
                        codeExample: `#!/bin/bash
# Linux Privilege Escalation Enumeration Script

echo "=== PRIVILEGE ESCALATION ENUMERATION ==="
echo "[*] Current User: $(id)"
echo "[*] Sudo Privileges:"
sudo -l 2>/dev/null || echo "  (no sudo access)"

echo "\\n[*] SUID Binaries (potential exploits):"
find / -perm -4000 -type f 2>/dev/null | while read suid; do
    base=$(basename "$suid")
    # Check against known exploitable binaries
    case "$base" in
        vim|nano|less|more|man|sh|bash|git|python*|perl|ruby)
            echo "  [!] DANGEROUS: $suid"
            ;;
        *)
            echo "  $suid"
            ;;
    esac
done | head -20

echo "\\n[*] Writable Directories in PATH:"
echo $PATH | tr ':' '\\n' | while read dir; do
    if [ -w "$dir" ] 2>/dev/null; then
        echo "  [!] WRITABLE: $dir"
    fi
done

echo "\\n[*] Running Services:"
ps aux | grep -E "\\broot\\b" | grep -v grep | cut -d' ' -f1-11 | head -10

echo "\\n[*] Installed Kernels:"
uname -a
echo "Vulnerable to: (check against exploitdb.com)"

echo "\\n[*] Cron Jobs:"
for f in /etc/cron* /var/spool/cron/crontabs/*; do
    [ -r "$f" ] && echo "=== $f ===" && cat "$f"
done 2>/dev/null | grep -v "^#"

echo "\\n[*] World-Writable Files in /tmp:"
find /tmp -writable -type f 2>/dev/null | head -10

echo "\\n[*] Files with Extended Capabilities:"
getcap -r / 2>/dev/null | grep -v " 0x0"`,
                        codeExplanation: "Extended capabilities (cap_setuid, cap_dac_override) can provide privileged operations without SUID. Tools like getcap enumerate them. getcap -r / is slower than finding SUID but catches subtle privesc vectors.",
                        bestPractices: [
                            "Always check `sudo -l` first — may grant passwordless command execution",
                            "Research kernel version (uname -a) against Exploit-DB and Metasploit",
                            "Check for world-writable cron jobs or /tmp symlink race conditions",
                            "Monitor for unusual process spawning (privilege escalation detection)"
                        ],
                        startingCode: `#!/bin/bash
# TODO: Build a privilege escalation framework that:
# TODO: Enumerates SUID binaries and checks against a CSV of exploitable ones
# TODO: Tests sudo -l and suggests dangerous sudo rules
# TODO: Searches /tmp for world-writable files and cron jobs
# TODO: Recommends specific CVEs based on kernel version
# TODO: Generates a JSON report of all findings

sudo_dangerous_patterns="(NOPASSWD|ALL=/usr/bin/python|env_reset=false)"

function enumerate_suid() {
    pass
}`
                    },
                    {
                        id: 12,
                        title: "Incident Response & Forensics",
                        difficulty: "Advanced",
                        estimatedTime: "65 min",
                        keyTerms: ["Incident Response", "Forensics", "Chain of Custody", "SIEM", "Threat Hunting", "Malware Analysis"],
                        theory: `
                            <h3 style="color: #e84040; margin-bottom: 12px;">The Incident Response Lifecycle</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;"><strong style="color:#e84040;">NIST IR Cycle:</strong> Preparation → Detection & Analysis → Containment, Eradication, Recovery → Post-Incident Activity. Speed is critical — every second of dwell time allows exfiltration and lateral movement.</p>

                            <h3 style="color: #e84040; margin-bottom: 12px;">Digital Forensics Process</h3>
                            <table style="width:100%; border-collapse:collapse; color:#d1d5db; margin-bottom:15px; font-size:13px;">
                                <tr style="background:rgba(232,64,64,0.1);">
                                    <td style="padding:9px; color:#e84040; font-weight:bold;">Phase</td>
                                    <td style="padding:9px; color:#e84040; font-weight:bold;">Actions</td>
                                    <td style="padding:9px; color:#e84040; font-weight:bold;">Tools</td>
                                </tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                                    <td style="padding:9px;">Acquisition</td>
                                    <td style="padding:9px;">Image disk/memory byte-for-byte, hash with MD5/SHA1</td>
                                    <td style="padding:9px;">dd, FTK Imager, Volatility</td>
                                </tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                                    <td style="padding:9px;">Preservation</td>
                                    <td style="padding:9px;">Write-protect, secure chain of custody</td>
                                    <td style="padding:9px;">Evidence bags, timestamps</td>
                                </tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                                    <td style="padding:9px;">Analysis</td>
                                    <td style="padding:9px;">Examine logs, files, memory, processes</td>
                                    <td style="padding:9px;">grep, strings, Yara, Volatility, Splunk</td>
                                </tr>
                                <tr>
                                    <td style="padding:9px;">Reporting</td>
                                    <td style="padding:9px;">Timeline of events, attribution, recommendations</td>
                                    <td style="padding:9px;">Markdown, Plaso timeline</td>
                                </tr>
                            </table>

                            <div style="background: rgba(232,64,64,0.15); border-left: 4px solid #e84040; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #e84040; font-weight: bold; margin-bottom: 8px;">⏱️ Dwell Time = Risk</p>
                                <p style="color: #d1d5db; margin: 0;">Average dwell time 2023: 206 days. Organizations detecting in &lt;1 day save millions in damages. Fast detection requires EDR (Endpoint Detection & Response), SIEM correlation, and threat hunting.</p>
                            </div>`,
                        codeExample: `import json, hashlib, datetime, subprocess
from pathlib import Path

class IncidentLogger:
    """Chain of custody for forensic evidence."""
    
    def __init__(self, case_id: str):
        self.case_id = case_id
        self.evidence_log = []
    
    def hash_file(self, filepath: str, algorithm: str = "sha256") -> str:
        """Compute cryptographic hash for integrity verification."""
        h = hashlib.new(algorithm)
        with open(filepath, "rb") as f:
            for chunk in iter(lambda: f.read(4096), b""):
                h.update(chunk)
        return h.hexdigest()
    
    def log_evidence(self, filepath: str, description: str):
        """Record evidence with hash, timestamp, and collector info."""
        entry = {
            "timestamp": datetime.datetime.utcnow().isoformat(),
            "case_id": self.case_id,
            "filepath": filepath,
            "description": description,
            "hash_sha256": self.hash_file(filepath),
            "hash_md5": self.hash_file(filepath, "md5"),
            "file_size": Path(filepath).stat().st_size,
            "collected_by": "IR_Team"
        }
        self.evidence_log.append(entry)
        return entry
    
    def generate_report(self, output_file: str):
        """Export chain of custody JSON."""
        with open(output_file, "w") as f:
            json.dump(self.evidence_log, f, indent=2)

# Threat Hunting: Suspicious Process Detection
def hunt_suspicious_processes(siem_query: str) -> list:
    """Query SIEM for processes matching IoC."""
    # Example: parent process cmd.exe spawning powershell
    suspicious_patterns = [
        "cmd.exe.*powershell",           # Living-off-land
        "svchost.exe.*c:\\\\windows\\\\",  # Svchost outside system32
        "rundll32.*\\\\appdata\\\\",       # Rundll32 from user temp
        "explorer.exe.*http:",             # Explorer making web requests
    ]
    return suspicious_patterns

# Timeline Reconstruction
def parse_windows_eventlog(logfile: str) -> list:
    """Parse Windows .evtx security log for suspicious events."""
    suspicious_events = {
        4688: "Process Creation",
        4720: "User Account Created",
        4732: "User added to privileged group",
        4625: "Failed Login",
        5140: "Network Share Access",
    }
    # Tool: python-evtx library
    return suspicious_events`,
                        codeExplanation: "Dual hashing (MD5 + SHA256) prevents collision attacks on evidence. Chain of custody JSON can be timestamped and signed for court admissibility. SIEM queries hunt patterns — tools like Sigma provide pre-written rules.",
                        bestPractices: [
                            "Preserve original evidence — always work on forensic copies",
                            "Document every step with timestamps and collector identity",
                            "Use write-blockers on disk imaging to prevent accidental modification",
                            "Establish a playbook before incident — automate collection and analysis",
                            "Integrate with threat intelligence (MISP, VirusTotal) for IoC enrichment"
                        ],
                        startingCode: `import json, hashlib, datetime

# TODO: Build an Incident Response toolkit:
# TODO: IncidentCase class that logs all evidence with SHA256
# TODO: Timeline analyzer that reconstructs attack sequence from logs
# TODO: Indicator of Compromise (IoC) extractor (IPs, domains, file hashes)
# TODO: Generate a professional IR report in Markdown
# TODO: Export JSON for SIEM ingestion

class IncidentCase:
    def __init__(self, case_id: str, severity: str):
        pass
    
    def add_evidence(self, filepath: str, source: str):
        pass
    
    def generate_timeline(self) -> list:
        pass`
                    },
                    {
                        id: 13,
                        title: "Purple Teaming & Continuous Security",
                        difficulty: "Advanced",
                        estimatedTime: "60 min",
                        keyTerms: ["Purple Team", "Red vs Blue", "Adversary Simulation", "Metrics", "MITRE ATT&CK Coverage", "Security Posture"],
                        theory: `
                            <h3 style="color: #e84040; margin-bottom: 12px;">Red Team, Blue Team, Purple Team</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;"><strong style="color:#ff4b4b;">Red Team:</strong> Offensive specialists simulating attacker behavior — no constraints, goal is exploitation. <strong style="color:#00d527;">Blue Team:</strong> Defensive specialists detecting and responding to attacks. <strong style="color:#ffca2c;">Purple Team:</strong> Collaboration — red team feeds findings to blue team for detection improvement, then tests new defenses.</p>

                            <h3 style="color: #e84040; margin-bottom: 12px;">Security Metrics That Matter</h3>
                            <ul style="margin-bottom: 15px; color: #d1d5db; padding-left: 20px; list-style-type: disc;">
                                <li style="margin-bottom: 8px;"><strong style="color:#00d527;">MTTD</strong> (Mean Time To Detect) — How fast can you detect an attack? Target: &lt;1 hour.</li>
                                <li style="margin-bottom: 8px;"><strong style="color:#00d527;">MTTR</strong> (Mean Time To Respond) — How fast can you contain and remediate? Target: &lt;4 hours.</li>
                                <li style="margin-bottom: 8px;"><strong style="color:#00d527;">ATT&CK Coverage %</strong> — % of MITRE techniques covered by detections.</li>
                                <li style="margin-bottom: 8px;"><strong style="color:#00d527;">False Positive Rate</strong> — Too high = alert fatigue → missed real attacks.</li>
                                <li style="margin-bottom: 8px;"><strong style="color:#ffca2c;">Dwell Time</strong> — How long does attacker persist undetected? (Industry avg: 206 days).</li>
                            </ul>

                            <div style="background: rgba(0,213,39,0.15); border-left: 4px solid #00d527; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #00d527; font-weight: bold; margin-bottom: 8px;">🏆 Capstone Achievement: Cybersecurity Expert</p>
                                <p style="color: #d1d5db; line-height: 1.6; margin: 0;">You've mastered offensive and defensive security — from reconnaissance and exploitation to incident response and purple teaming. You understand crypto, APIs, networks, Linux/Windows internals, and real-world threat modeling. Ready for roles in penetration testing, red teaming, threat hunting, SOC engineering, and security architecture.</p>
                            </div>`,
                        codeExample: `import json, yaml, re
from datetime import datetime, timedelta

class PurpleTeamFramework:
    """Purple team: coordinate red/blue operations."""
    
    def __init__(self):
        self.scenarios = []  # Red team scenarios
        self.detections = []  # Blue team detection rules
        self.metrics = {}
    
    def define_scenario(self, scenario_id: str, mitre_techniques: list, description: str):
        """Red team defines attack scenario."""
        return {
            "scenario_id": scenario_id,
            "techniques": mitre_techniques,
            "description": description,
            "executed_at": datetime.utcnow().isoformat(),
            "results": []
        }
    
    def add_detection_rule(self, rule_name: str, technique_id: str, query: str):
        """Blue team adds detection for technique."""
        return {
            "rule_name": rule_name,
            "technique": technique_id,
            "query": query,
            "coverage": True
        }
    
    def calculate_coverage(self) -> dict:
        """Coverage % of MITRE ATT&CK techniques."""
        all_mitre_techniques = 400  # Approximate
        covered = len(set(d["technique"] for d in self.detections))
        coverage_percent = (covered / all_mitre_techniques) * 100
        return {
            "total_mitre_techniques": all_mitre_techniques,
            "covered": covered,
            "coverage_percent": round(coverage_percent, 2),
            "gaps": all_mitre_techniques - covered
        }
    
    def calculate_metrics(self, incidents: list) -> dict:
        """Compute MTTD, MTTR, dwell time."""
        times_to_detect = []
        times_to_respond = []
        
        for inc in incidents:
            if "detected_at" in inc and "occurred_at" in inc:
                dt = datetime.fromisoformat(inc["detected_at"]) - \
                     datetime.fromisoformat(inc["occurred_at"])
                times_to_detect.append(dt.total_seconds() / 3600)  # hours
            
            if "resolved_at" in inc and "detected_at" in inc:
                tr = datetime.fromisoformat(inc["resolved_at"]) - \
                     datetime.fromisoformat(inc["detected_at"])
                times_to_respond.append(tr.total_seconds() / 3600)
        
        return {
            "mttd_hours": round(sum(times_to_detect) / len(times_to_detect), 2) if times_to_detect else 0,
            "mttr_hours": round(sum(times_to_respond) / len(times_to_respond), 2) if times_to_respond else 0,
            "detections": len(times_to_detect),
            "incidents": len(incidents),
            "assessment_date": datetime.utcnow().isoformat()
        }

# Sigma Rules: Industry-standard detection rules
def load_sigma_rules() -> list:
    """Load YAML-based detection rules (Sigma format)."""
    sigma_example = """
    title: Suspicious PowerShell Execution
    logsource:
        product: windows
        service: security
    detection:
        selection:
            EventID: 4688
            CommandLine|contains:
                - 'powershell'
                - '-nop'
                - '-enc'
        condition: selection
    falsepositives:
        - Legitimate admin scripts
    """
    return [sigma_example]`,
                        codeExplanation: "Sigma rules are community-driven, YAML-based detection rules. Tools like Sigma CLI convert them to Splunk, ELK, or SIEM-specific formats. Purple teams use Sigma to ensure detections match offensive TTPs.",
                        bestPractices: [
                            "Establish baseline metrics before starting purple team exercises",
                            "Schedule regular adversary simulation (monthly or quarterly)",
                            "Map every red team scenario to MITRE ATT&CK for gap analysis",
                            "Share red team findings with blue team to improve detections",
                            "Automate alert tuning to reduce false positives — target <5%"
                        ],
                        startingCode: `import json
from datetime import datetime, timedelta

# TODO: Build a Purple Team metrics dashboard:
# TODO: Define 10 MITRE ATT&CK techniques to test
# TODO: Create red team scenarios for each technique
# TODO: Write detection rules (in pseudocode) for blue team
# TODO: Calculate MITRE ATT&CK coverage %
# TODO: Track MTTD/MTTR across 5 simulated incidents
# TODO: Generate a comprehensive security posture report

class SecurityAssessment:
    def __init__(self, organization: str):
        pass
    
    def add_red_scenario(self, technique_id: str, description: str):
        pass
    
    def add_blue_detection(self, technique_id: str, detection_rule: str):
        pass
    
    def generate_posture_report(self) -> dict:
        pass`
                    },
                    {
                        id: 14,
                        title: "Secure Development Lifecycle (SDLC) & AppSec",
                        difficulty: "Advanced",
                        estimatedTime: "60 min",
                        keyTerms: ["SAST", "DAST", "SCA", "Threat Modeling", "Secure Coding", "DevSecOps"],
                        theory: `
                            <h3 style="color: #e84040; margin-bottom: 12px;">Security Shifted Left: From Dev to Prod</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Modern security doesn't start at deployment — it starts at code commit. <strong>Shift-left</strong> philosophy integrates security checks into the development pipeline: SAST during coding, DAST during QA, SCA for dependencies, secrets scanning in CI/CD.</p>

                            <h3 style="color: #e84040; margin-bottom: 12px;">The AppSec Testing Triangle</h3>
                            <table style="width:100%; border-collapse:collapse; color:#d1d5db; margin-bottom:15px; font-size:13px;">
                                <tr style="background:rgba(232,64,64,0.1);">
                                    <td style="padding:9px; color:#e84040; font-weight:bold;">Test Type</td>
                                    <td style="padding:9px; color:#e84040; font-weight:bold;">What It Does</td>
                                    <td style="padding:9px; color:#e84040; font-weight:bold;">Tools</td>
                                    <td style="padding:9px; color:#e84040; font-weight:bold;">When to Run</td>
                                </tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                                    <td style="padding:9px;"><strong>SAST</strong></td>
                                    <td style="padding:9px;">Source code analysis</td>
                                    <td style="padding:9px;">SonarQube, Checkmarx, Bandit</td>
                                    <td style="padding:9px;">Pre-commit</td>
                                </tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                                    <td style="padding:9px;"><strong>SCA</strong></td>
                                    <td style="padding:9px;">Dependency vulnerabilities</td>
                                    <td style="padding:9px;">Snyk, OWASP Dependency-Check</td>
                                    <td style="padding:9px;">Build time</td>
                                </tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                                    <td style="padding:9px;"><strong>DAST</strong></td>
                                    <td style="padding:9px;">Runtime app testing</td>
                                    <td style="padding:9px;">OWASP ZAP, Burp Suite</td>
                                    <td style="padding:9px;">QA/Staging</td>
                                </tr>
                                <tr>
                                    <td style="padding:9px;"><strong>IAST</strong></td>
                                    <td style="padding:9px;">Runtime + code correlation</td>
                                    <td style="padding:9px;">Contrast, CodeLogic</td>
                                    <td style="padding:9px;">Continuous testing</td>
                                </tr>
                            </table>`,
                        codeExample: `# Secure coding practices in Python

import hashlib, hmac, secrets, os
from typing import Optional
import logging

logger = logging.getLogger(__name__)

# 1. NEVER hardcode secrets
BAD_SECRET = "my_password_123"  # CVE!

GOOD_SECRET = os.getenv("API_SECRET")
if not GOOD_SECRET:
    raise ValueError("API_SECRET not set in environment")

# 2. Input validation with type hints
def process_user_input(user_id: int, query: str) -> Optional[dict]:
    """Validate and sanitize inputs."""
    # Type hints help SAST tools detect type confusion
    if not isinstance(user_id, int) or user_id <= 0:
        raise ValueError("Invalid user_id")
    
    # Length limits prevent DoS via massive input
    if len(query) > 1000:
        raise ValueError("Query too long")
    
    # Regex validation for expected format
    import re
    if not re.match(r'^[a-zA-Z0-9 ]+$', query):
        raise ValueError("Query contains invalid characters")
    
    logger.info(f"Processing query for user {user_id}")
    return {"user_id": user_id, "query": query}

# 3. Secure comparison (prevent timing attacks)
def verify_token(provided: str, stored: str) -> bool:
    """Constant-time comparison."""
    return hmac.compare_digest(provided, stored)

# 4. Secure randomness (not random.random())
def generate_session_token() -> str:
    """Use secrets module for cryptographic randomness."""
    return secrets.token_urlsafe(32)

# 5. Dependency version pinning
# requirements.txt:
# flask==2.3.2  (specific version, not >=2.3)
# PyJWT==2.8.0
# cryptography==41.0.0

# 6. Pre-commit hooks (.pre-commit-config.yaml)
"""
repos:
  - repo: https://github.com/PyCQA/bandit
    rev: 1.7.5
    hooks:
      - id: bandit
        args: [-ll]  # Only report medium+ severity
  
  - repo: https://github.com/gitpython-developers/GitPython
    rev: 3.1.30
    hooks:
      - id: detect-secrets
        args: ['scan', '--baseline', '.secrets.baseline']
"""`,
                        codeExplanation: "Type hints enable static analysis tools to detect type confusion bugs. secrets module uses os.urandom() for cryptographically strong randomness. Pre-commit hooks block insecure code before it reaches repository.",
                        bestPractices: [
                            "Integrate SAST into IDE — catch issues before commit",
                            "Use dependency lock files (requirements.lock, package-lock.json) for reproducible builds",
                            "Secrets scanning in CI/CD — tools like detect-secrets prevent hardcoded credentials",
                            "Regular security training for developers — security is everyone's job",
                            "Automate DAST in QA pipeline — scan every build before staging"
                        ],
                        startingCode: `# TODO: Build a DevSecOps pipeline with:
# TODO: Pre-commit hook running Bandit (SAST)
# TODO: CI workflow running dependency scanning
# TODO: Secrets detection (reject commits with API keys)
# TODO: DAST integration (OWASP ZAP baseline scan)
# TODO: Generate a compliance report (CWE/OWASP coverage)

def run_security_checks(repo_path: str) -> dict:
    pass`
                    },
                    {
                        id: 15,
                        title: "Capstone: Full-Stack Security Audit",
                        difficulty: "Advanced",
                        estimatedTime: "120 min",
                        keyTerms: ["Security Audit", "Vulnerability Assessment", "Risk Scoring", "Remediation Planning", "Executive Summary"],
                        theory: `
                            <h3 style="color: #e84040; margin-bottom: 12px;">Comprehensive Security Assessment</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">A professional security audit integrates all techniques from this course: passive OSINT, active scanning, web app testing, crypto validation, threat modeling, and business impact analysis. The output is a risk-prioritized remediation roadmap.</p>

                            <h3 style="color: #e84040; margin-bottom: 12px;">Audit Phases</h3>
                            <ul style="margin-bottom: 15px; color: #d1d5db; padding-left: 20px; list-style-type: disc;">
                                <li style="margin-bottom: 8px;"><strong style="color:#00d527;">Planning:</strong> Scope, rules of engagement, asset inventory.</li>
                                <li style="margin-bottom: 8px;"><strong style="color:#00d527;">Reconnaissance:</strong> OSINT, subdomain enumeration, service discovery.</li>
                                <li style="margin-bottom: 8px;"><strong style="color:#00d527;">Vulnerability Assessment:</strong> SAST, dependency scanning, port scanning, config review.</li>
                                <li style="margin-bottom: 8px;"><strong style="color:#00d527;">Exploitation:</strong> Proof-of-concept for high-severity findings.</li>
                                <li style="margin-bottom: 8px;"><strong style="color:#00d527;">Reporting:</strong> Executive summary, technical details, risk scoring, recommendations.</li>
                            </ul>

                            <div style="background: rgba(0,213,39,0.15); border-left: 4px solid #00d527; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #00d527; font-weight: bold; margin-bottom: 8px;">🎓 MISSION COMPLETE: Cybersecurity Mastery Achieved</p>
                                <p style="color: #d1d5db; line-height: 1.6; margin: 0;">You've progressed from threat fundamentals to advanced offense (exploitation) and defense (incident response). You understand the attacker mindset, cryptography, networks, web security, and security operations. This capstone project synthesizes everything into a professional assessment — the currency of the industry.</p>
                            </div>`,
                        codeExample: `import json, datetime
from typing import List, Dict

class SecurityAudit:
    """Complete security assessment framework."""
    
    def __init__(self, client: str, scope: List[str], start_date: str):
        self.client = client
        self.scope = scope
        self.findings = []
        self.start_date = start_date
    
    def add_finding(self, severity: str, category: str, title: str, 
                    description: str, poc: str, remediation: str, 
                    cvss_score: float, affected_asset: str):
        """Log vulnerability finding."""
        finding = {
            "id": f"VUL-{len(self.findings)+1:03d}",
            "severity": severity,  # Critical/High/Medium/Low
            "category": category,  # OWASP Top 10 / STRIDE
            "title": title,
            "description": description,
            "proof_of_concept": poc,
            "remediation": remediation,
            "cvss_score": cvss_score,
            "affected_asset": affected_asset,
            "discovered_date": datetime.date.today().isoformat()
        }
        self.findings.append(finding)
        return finding
    
    def calculate_risk_score(self) -> dict:
        """Risk scoring: exploitability + impact."""
        risk_distribution = {
            "Critical": 0, "High": 0, "Medium": 0, "Low": 0
        }
        for f in self.findings:
            risk_distribution[f["severity"]] += 1
        
        total_cvss = sum(f["cvss_score"] for f in self.findings)
        avg_cvss = total_cvss / len(self.findings) if self.findings else 0
        
        return {
            "total_findings": len(self.findings),
            "distribution": risk_distribution,
            "average_cvss": round(avg_cvss, 2),
            "risk_rating": self._rate_risk(avg_cvss)
        }
    
    def _rate_risk(self, avg_cvss: float) -> str:
        if avg_cvss >= 9.0: return "CRITICAL"
        if avg_cvss >= 7.0: return "HIGH"
        if avg_cvss >= 4.0: return "MEDIUM"
        return "LOW"
    
    def generate_executive_summary(self) -> str:
        """High-level summary for non-technical stakeholders."""
        risk = self.calculate_risk_score()
        return f"""
EXECUTIVE SUMMARY
================
Client: {self.client}
Assessment Date: {self.start_date}
Scope: {', '.join(self.scope)}

FINDINGS: {risk['total_findings']} vulnerabilities discovered
  - Critical: {risk['distribution']['Critical']}
  - High:     {risk['distribution']['High']}
  - Medium:   {risk['distribution']['Medium']}
  - Low:      {risk['distribution']['Low']}

OVERALL RISK RATING: {risk['risk_rating']}
Average CVSS Score: {risk['average_cvss']}/10.0

RECOMMENDATION: Prioritize remediation of Critical findings within 30 days.
        """
    
    def export_report(self, filename: str):
        """Generate professional Markdown report."""
        report = self.generate_executive_summary()
        report += "\\n\\nDETAILED FINDINGS\\n" + "="*50 + "\\n\\n"
        
        # Sort by severity
        sorted_findings = sorted(self.findings, 
                                key=lambda x: {"Critical":0,"High":1,"Medium":2,"Low":3}[x["severity"]])
        
        for f in sorted_findings:
            report += f"""
**{f['id']}: {f['title']}**
- Severity: {f['severity']} (CVSS {f['cvss_score']})
- Category: {f['category']}
- Affected Asset: {f['affected_asset']}

Description:
{f['description']}

Proof of Concept:
{f['proof_of_concept']}

Remediation:
{f['remediation']}
const coursesDB = {

    /* ═══════════════════════════════════════════════════════════════════
       C++ COURSE
    ═══════════════════════════════════════════════════════════════════ */
    "cpp-advanced": {
        id: "cpp-advanced",
        title: "C++ Programming: Core & Security",
        description: "Master low-level systems programming with focus on memory management, security vulnerabilities, and performance optimization",
        totalLessons: 20,
        difficulty: "Advanced",
        prerequisites: ["Basic programming knowledge", "Understanding of algorithms"],
        modules: [
            {
                moduleId: 1,
                moduleName: "Module 1: Foundations & Memory Architecture",
                moduleDescription: "Understand C++ fundamentals, memory models, and hardware interaction",
                lessons: [
                    {
                        id: 1,
                        title: "Low-Level Programming Philosophy",
                        difficulty: "Intermediate",
                        estimatedTime: "45 min",
                        keyTerms: ["Compiled Language", "ALU", "MMU", "Preprocessor"],
                        theory: 
                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">What Makes C++ Unique</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">C++ is a <strong>statically-typed, compiled language</strong> that bridges the gap between high-level abstractions and hardware-level control. Unlike interpreted languages, C++ code is transformed directly into machine instructions at compile-time, enabling direct CPU and memory manipulation.</p>
                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Hardware Layer Interaction</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Through C++, you can interact with:</p>
                            <ul style="margin-bottom: 15px; color: #d1d5db; padding-left: 20px; list-style-type: disc;">
                                <li style="margin-bottom: 8px;"><strong style="color: #00d527;">ALU (Arithmetic Logic Unit)</strong> — Performs bitwise and arithmetic operations</li>
                                <li style="margin-bottom: 8px;"><strong style="color: #00d527;">MMU (Memory Management Unit)</strong> — Handles virtual memory and page translation</li>
                                <li style="margin-bottom: 8px;"><strong style="color: #00d527;">CPU Caches</strong> — L1, L2, L3 hierarchy for optimized data access</li>
                                <li style="margin-bottom: 8px;"><strong style="color: #00d527;">System Interrupts</strong> — Signal handlers for asynchronous events</li>
                            </ul>
                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">The Preprocessor Stage</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Before compilation occurs, the <strong>Preprocessor</strong> processes directives like <span style="color: #4a6ee0; font-family: monospace; background: rgba(74,110,224,0.1); padding: 2px 6px; border-radius: 3px;">#include</span>.</p>
                            <div style="background: rgba(74,110,224,0.15); border-left: 4px solid #4a6ee0; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #4a6ee0; font-weight: bold; margin-bottom: 8px;">💡 Compilation Pipeline</p>
                                <p style="color: #d1d5db; margin: 0;">Source Code → Preprocessor → Compiler → Assembler → Linker → Executable Binary</p>
                            </div>`,
                        codeExample: "#include <iostream>\nusing namespace std;\n\nint main() {\n    std::cout << \"System initialized...\\n\";\n    std::cout << \"Accessing hardware layers...\\n\";\n    return 0;\n}",
                        codeExplanation: "The <span style=\"font-family:monospace;\">std</span> namespace prevents naming conflicts. The return value signals OS success (0) or failure (non-zero).",
                        bestPractices: [
                            "Always use std:: prefix or 'using namespace' to avoid ambiguity",
                            "Return 0 for successful execution, non-zero error codes for failures",
                            "Use \\n instead of endl for faster console output in production code"
                        ],
                        startingCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    // TODO: Output \"System Ready\" to the console\n    \n    return 0;\n}"
                    },
                    {
                        id: 2,
                        title: "Strict Typing & Integer Overflow",
                        difficulty: "Intermediate",
                        estimatedTime: "50 min",
                        keyTerms: ["Type System", "Integer Overflow", "Signed/Unsigned", "Data Types"],
                        theory: `
                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Type System Fundamentals</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">C++ enforces <strong>strict typing</strong> at compile-time. You must explicitly declare variable types, allowing the compiler to allocate correct memory and perform type-safe operations.</p>
                            <div style="background: rgba(255,75,75,0.15); border-left: 4px solid #ff4b4b; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #ff4b4b; font-weight: bold; margin-bottom: 10px;">⚠️ Security Vulnerability: Integer Overflow</p>
                                <p style="color: #d1d5db; line-height: 1.6; margin-bottom: 10px;"><strong>Definition:</strong> Integer overflow occurs when an arithmetic operation produces a value exceeding the type's maximum, causing wrap-around to the minimum.</p>
                                <p style="color: #d1d5db; margin: 0;"><strong>Mitigation:</strong> Use wider types (long long), validate bounds before operations, or use safe arithmetic libraries.</p>
                            </div>`,
                        codeExample: "unsigned int maxVal = 4294967295;\nstd::cout << \"Max: \" << maxVal << std::endl;\nmaxVal = maxVal + 1;\nstd::cout << \"After Overflow: \" << maxVal; // Outputs: 0",
                        codeExplanation: "An unsigned 32-bit integer overflows after 2^32 - 1. The next increment wraps to 0.",
                        bestPractices: [
                            "Use unsigned types only for quantities that are logically non-negative",
                            "Check boundaries before performing operations on user input",
                            "Use compiler warnings: -Woverflow, -Wsign-compare"
                        ],
                        startingCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    // TODO: Create an int 'pin' and assign 1234, then print it\n    \n    return 0;\n}"
                    },
                    {
                        id: 3,
                        title: "Memory Addresses: The & Operator",
                        difficulty: "Intermediate",
                        estimatedTime: "40 min",
                        keyTerms: ["Memory Address", "Address-of Operator", "Virtual Memory", "ASLR"],
                        theory: `
                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Memory Address Space</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Every variable occupies a specific location in RAM, represented as a <strong>hexadecimal memory address</strong>. Modern OSes provide <strong>Virtual Memory</strong> isolation via the MMU.</p>
                            <div style="background: rgba(0,213,39,0.15); border-left: 4px solid #00d527; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #00d527; font-weight: bold; margin-bottom: 8px;">🔍 Reverse Engineering Insight</p>
                                <p style="color: #d1d5db; margin: 0;">Memory addresses are fundamental in debugging, profiling, and reverse engineering. ASLR randomizes base addresses each run as a security mitigation.</p>
                            </div>`,
                        codeExample: "int secretData = 7788;\nstd::cout << \"Value: \" << secretData << std::endl;\nstd::cout << \"Address: \" << &secretData << std::endl;\nstd::cout << \"Hex: \" << std::hex << &secretData;",
                        codeExplanation: "The <span style=\"font-family:monospace;\">std::hex</span> manipulator forces hexadecimal output. Addresses change per run due to ASLR.",
                        bestPractices: [
                            "Use std::hex and std::dec for address formatting",
                            "Understand that addresses change per execution due to ASLR",
                            "Memory dumps are essential tools for reverse engineering"
                        ],
                        startingCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int target = 100;\n    // TODO: Print the memory address of 'target' in hexadecimal\n    return 0;\n}"
                    },
                    {
                        id: 4,
                        title: "Pointers & Memory Manipulation",
                        difficulty: "Advanced",
                        estimatedTime: "55 min",
                        keyTerms: ["Pointer", "Dereference", "Memory Indirection", "Address-to-Value"],
                        theory: `
                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">What Is a Pointer?</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">A <strong>Pointer</strong> is a variable that stores a memory address rather than a direct value. The <span style="color:#ffca2c; font-family:monospace;">*</span> symbol serves dual purposes: declaration and dereferencing.</p>
                            <div style="background: rgba(74,110,224,0.15); border-left: 4px solid #4a6ee0; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #4a6ee0; font-weight: bold; margin-bottom: 10px;">📊 Memory Visualization</p>
                                <p style="margin: 0; color: #d1d5db; font-family: monospace; line-height: 1.8;">
                                    Address: 0x1000 | Variable: health | Value: 80<br/>
                                    Address: 0x2000 | Variable: ptr | Value: 0x1000<br/>
                                    *ptr → Dereference → 80
                                </p>
                            </div>`,
                        codeExample: "int health = 80;\nint* ptr = &health;\nstd::cout << \"Value: \" << health << std::endl;\nstd::cout << \"Address: \" << ptr << std::endl;\nstd::cout << \"Deref: \" << *ptr << std::endl;\n*ptr = 100;\nstd::cout << \"Health now: \" << health; // 100",
                        codeExplanation: "Changes via *ptr directly affect the original variable. This is the foundation of all low-level memory manipulation.",
                        bestPractices: [
                            "Always initialize pointers before dereferencing",
                            "Use nullptr instead of NULL for null pointers",
                            "Consider smart pointers (std::unique_ptr) for modern code"
                        ],
                        startingCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int val = 10;\n    // TODO: Create pointer 'p' to 'val'\n    // TODO: Double val's value via dereference\n    // TODO: Print the final value\n    return 0;\n}"
                    },
                    {
                        id: 5,
                        title: "Bitwise Operations & Low-Level Manipulation",
                        difficulty: "Advanced",
                        estimatedTime: "60 min",
                        keyTerms: ["Bitwise AND", "Bitwise OR", "XOR", "Bit Shifting", "Cryptography"],
                        theory: `
                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Binary Fundamentals</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Bitwise operators manipulate individual bits within bytes — essential for hardware communication, cryptography, and performance optimization.</p>
                            <div style="background: rgba(255,202,44,0.15); border-left: 4px solid #ffca2c; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #ffca2c; font-weight: bold; margin-bottom: 10px;">🔐 XOR: The Reversible Operation</p>
                                <p style="color: #d1d5db; line-height: 1.6; margin: 0;">XOR forms the basis of stream ciphers. (A ^ B) ^ B = A — applying the same key twice restores the original value. One CPU cycle per byte makes it ideal for fast obfuscation.</p>
                            </div>`,
                        codeExample: "int message = 42;  // Binary: 00101010\nint key = 7;       // Binary: 00000111\nint encrypted = message ^ key;\nstd::cout << \"Encrypted: \" << encrypted << std::endl;\nint decrypted = encrypted ^ key;\nstd::cout << \"Decrypted: \" << decrypted; // 42\n\n// Bit masking\nint flags = 0b11110000;\nint mask  = 0b00001111;\nint result = flags & mask; // Lower 4 bits",
                        codeExplanation: "XOR operates in O(1) time. Bit masking extracts specific bits by ANDing with a mask pattern.",
                        bestPractices: [
                            "Use XOR for simple obfuscation only, not production encryption",
                            "Create readable bit patterns using binary literals (0b prefix)",
                            "Use std::bitset for clearer bit pattern manipulation"
                        ],
                        startingCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int data = 123;\n    int key = 9;\n    // TODO: Encrypt 'data' with XOR\n    // TODO: Decrypt and verify original == decrypted\n    return 0;\n}"
                    }
                ],
                quiz: [
                    { question: "Which keyword imports a library before compilation?", options: ["#define", "#include", "using", "namespace"], correctAnswer: 1 },
                    { question: "What is the memory size of a standard 'int' on most 64-bit systems?", options: ["1 byte", "2 bytes", "4 bytes", "8 bytes"], correctAnswer: 2 },
                    { question: "What happens during an 'Integer Overflow'?", options: ["The computer crashes", "The value wraps around to the minimum possible value", "The value stops at the maximum", "Memory is automatically expanded"], correctAnswer: 1 },
                    { question: "Which operator gets the memory address of a variable?", options: ["*", "!", "&", "^"], correctAnswer: 2 },
                    { question: "What does 'Dereferencing' a pointer mean?", options: ["Deleting the pointer", "Finding the pointer's address", "Accessing the value at the address the pointer holds", "Changing the pointer's type"], correctAnswer: 2 },
                    { question: "Which bitwise operator is used for reversible encryption?", options: ["& (AND)", "| (OR)", "^ (XOR)", "~ (NOT)"], correctAnswer: 2 },
                    { question: "Why does C++ lack automatic Garbage Collection?", options: ["To force developers to write more code", "To provide maximum performance and manual memory control", "Because it is an old language", "To save disk space"], correctAnswer: 1 },
                    { question: "What is stored in a pointer variable?", options: ["A character", "A whole number", "A memory address", "A boolean flag"], correctAnswer: 2 },
                    { question: "What symbol is used to declare a pointer type?", options: ["int&", "int*", "int#", "int^"], correctAnswer: 1 },
                    { question: "Which function serves as the mandatory entry point for a C++ application?", options: ["start()", "init()", "main()", "execute()"], correctAnswer: 2 }
                ]
            },
            {
                moduleId: 2,
                moduleName: "Module 2: Memory Mastery & Advanced Pointers",
                moduleDescription: "Deep dive into heap memory, dynamic allocation, arrays, and pointer arithmetic",
                lessons: [
                    {
                        id: 6,
                        title: "Arrays & Buffer Overflow Vulnerabilities",
                        difficulty: "Advanced",
                        estimatedTime: "55 min",
                        keyTerms: ["Buffer Overflow", "Array Bounds", "Stack Smashing", "Memory Corruption"],
                        theory: `
                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Array Structure in Memory</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">An <strong>Array</strong> is a contiguous block of identically-sized elements. C++ trusts developers to calculate offsets — no bounds checking occurs at runtime.</p>
                            <div style="background: rgba(255,75,75,0.15); border-left: 4px solid #ff4b4b; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #ff4b4b; font-weight: bold; margin-bottom: 10px;">🚨 CRITICAL VULNERABILITY: Buffer Overflow</p>
                                <p style="color: #d1d5db; line-height: 1.6; margin-bottom: 10px;"><strong>Definition:</strong> Writing data beyond an array's allocated boundary, overwriting adjacent memory.</p>
                                <p style="color: #d1d5db; line-height: 1.6;"><strong>Real-World:</strong> Morris Worm (1988), Code Red (2001), Heartbleed (2014) all exploited buffer overflows.</p>
                            </div>`,
                        codeExample: "int secureKeys[5] = {101, 202, 303, 404, 505};\nstd::cout << secureKeys[0] << std::endl; // Safe\n\n// VULNERABILITY: Out-of-bounds write\nsecureKeys[10] = 999; // Overwrites unrelated memory!\n// This may corrupt passwords, function pointers, or return addresses",
                        codeExplanation: "C++ performs NO runtime bounds checking. Address = &array[0] + (index × sizeof(element)) with no validation.",
                        bestPractices: [
                            "Always validate array indices against size before access",
                            "Use std::array<T,N> or std::vector<T> with at() for bounds checking",
                            "Enable AddressSanitizer during development: -fsanitize=address"
                        ],
                        startingCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int data[3] = {10, 20, 30};\n    // TODO: Access and print the SECOND element (index 1)\n    return 0;\n}"
                    },
                    {
                        id: 7,
                        title: "Memory Layout: Stack vs Heap",
                        difficulty: "Advanced",
                        estimatedTime: "50 min",
                        keyTerms: ["Stack Memory", "Heap Memory", "LIFO", "Dynamic Allocation", "Memory Segmentation"],
                        theory: `
                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Memory Segmentation</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">The OS divides a process's address space into distinct regions:</p>
                            <div style="background: rgba(74,110,224,0.1); padding: 15px; margin: 20px 0; border-radius: 6px; font-family: monospace; color: #d1d5db; font-size: 13px; line-height: 1.8;">
                                ┌─────────────────┐ High Address<br/>
                                │  Stack (grows ↓) │ ← Local variables<br/>
                                ├─────────────────┤<br/>
                                │  Heap (grows ↑)  │ ← Dynamic memory<br/>
                                ├─────────────────┤<br/>
                                │  BSS / Data     │ ← Globals/statics<br/>
                                ├─────────────────┤<br/>
                                │  Code / Text    │ ← Machine instructions<br/>
                                └─────────────────┘ Low Address
                            </div>
                            <p style="color: #d1d5db; line-height: 1.6;"><strong style="color:#ff4b4b;">Stack Overflow:</strong> Deep recursion exhausts limited stack space. <strong style="color:#ff4b4b;">Heap Overflow:</strong> Writing past an allocated block corrupts heap metadata, enabling code execution.</p>`,
                        codeExample: "void stackExample() {\n    int x = 5;        // Stack: auto-managed\n    double y = 3.14;  // Stack: auto-managed\n}   // Both destroyed here automatically\n\nint* heapExample() {\n    int* ptr = new int; // Heap: manual\n    *ptr = 42;\n    return ptr; // Caller MUST delete\n}",
                        codeExplanation: "Stack variables have automatic lifetime. Heap variables persist until explicitly deleted. Forgetting delete causes memory leaks.",
                        bestPractices: [
                            "Use stack for small, fixed-size data with known lifetime",
                            "Reserve heap for large or long-lived data structures",
                            "Modern C++: Prefer std::unique_ptr and std::shared_ptr over raw new/delete"
                        ],
                        startingCode: "// Theoretical lesson — review concepts above and press Next."
                    },
                    {
                        id: 8,
                        title: "Dynamic Allocation: new & delete",
                        difficulty: "Advanced",
                        estimatedTime: "55 min",
                        keyTerms: ["new Operator", "delete Operator", "Memory Leak", "Dangling Pointer", "RAII"],
                        theory: `
                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">The new & delete Operators</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;"><span style="color:#4a6ee0; font-family:monospace;">new</span> allocates on the Heap and returns a pointer. <span style="color:#ff4b4b; font-family:monospace;">delete</span> frees it. Missing delete → memory leak.</p>
                            <div style="background: rgba(0,213,39,0.15); border-left: 4px solid #00d527; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #00d527; font-weight: bold; margin-bottom: 10px;">🏆 Golden Rule</p>
                                <p style="color: #d1d5db; margin: 0;">Every <code>new</code> must have a matching <code>delete</code>. Every <code>new[]</code> must have a matching <code>delete[]</code>.</p>
                            </div>
                            <div style="background: rgba(255,75,75,0.15); border-left: 4px solid #ff4b4b; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #ff4b4b; font-weight: bold; margin-bottom: 10px;">⚠️ Dangling Pointer</p>
                                <p style="color: #d1d5db;">A pointer referencing already-freed memory. Always set to <code>nullptr</code> after deletion to prevent accidental reuse.</p>
                            </div>`,
                        codeExample: "int* single = new int;\n*single = 100;\ndelete single;\nsingle = nullptr; // Best practice\n\nint* arr = new int[10];\narr[0] = 5;\ndelete[] arr;  // Note: delete[] for arrays\narr = nullptr;",
                        codeExplanation: "Use delete[] with bracket notation for arrays. RAII encapsulates this: destructors run guaranteed cleanup automatically.",
                        bestPractices: [
                            "Always set pointers to nullptr after deletion",
                            "Use delete[] for arrays, delete for single objects",
                            "Enable memory debugging with Valgrind or AddressSanitizer",
                            "Modern C++17+: Use std::unique_ptr and std::make_unique"
                        ],
                        startingCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    // TODO: Allocate an int on heap using 'new'\n    // TODO: Set its value to 77\n    // TODO: Print via dereferencing\n    // TODO: Delete and set to nullptr\n    return 0;\n}"
                    },
                    {
                        id: 9,
                        title: "Pointer Arithmetic & Navigation",
                        difficulty: "Advanced",
                        estimatedTime: "50 min",
                        keyTerms: ["Pointer Arithmetic", "Array Traversal", "Offset Calculation", "Type Scaling"],
                        theory: `
                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Pointer Arithmetic Rules</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Adding an integer to a pointer advances it by <strong>multiples of the element type's size</strong>, not raw bytes:</p>
                            <p style="margin-bottom: 15px; color: #d1d5db; font-family: monospace; background: rgba(255,255,255,0.05); padding: 10px; border-radius: 4px;">ptr + n = ptr + (n × sizeof(element_type))</p>
                            <div style="background: rgba(255,75,75,0.15); border-left: 4px solid #ff4b4b; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #ff4b4b; font-weight: bold; margin-bottom: 8px;">⚠️ Out-of-Bounds Arithmetic</p>
                                <p style="color: #d1d5db; margin: 0;">Pointer arithmetic beyond array bounds is undefined behavior. Always validate against the end pointer.</p>
                            </div>`,
                        codeExample: "int arr[3] = {10, 20, 30};\nint* p = arr;\nstd::cout << *p << std::endl;       // 10\np++;\nstd::cout << *p << std::endl;       // 20\nstd::cout << *(p+1) << std::endl;   // 30\n\nint* pEnd = arr + 3;          // Past-the-end pointer\nint distance = pEnd - arr;    // 3 elements",
                        codeExplanation: "The compiler scales pointer offsets by element size automatically. Subtraction between two pointers of the same array gives element count.",
                        bestPractices: [
                            "Always maintain end pointer for bounds validation",
                            "Use iterators (std::vector::iterator) for safer traversal",
                            "Consider std::span (C++20) for pointer + size pairs"
                        ],
                        startingCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int sequence[3] = {55, 66, 77};\n    int* ptr = sequence;\n    // TODO: Use pointer arithmetic to navigate to the third element\n    // TODO: Print the value 77\n    return 0;\n}"
                    },
                    {
                        id: 10,
                        title: "References vs Pointers: Safe Indirection",
                        difficulty: "Advanced",
                        estimatedTime: "45 min",
                        keyTerms: ["Reference", "Alias", "Const Reference", "Parameter Passing", "Memory Efficiency"],
                        theory: `
                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">What Is a Reference?</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">A <strong>Reference</strong> is an automatic alias to an existing variable. Cannot be null, cannot be reassigned — safer than pointers for parameter passing.</p>
                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Pointers vs References</h3>
                            <table style="width:100%; border-collapse:collapse; color:#d1d5db; margin-bottom:15px;">
                                <tr style="background:rgba(74,110,224,0.1);">
                                    <td style="padding:10px; color:#4a6ee0; font-weight:bold;">Feature</td>
                                    <td style="padding:10px; color:#4a6ee0; font-weight:bold;">Pointer</td>
                                    <td style="padding:10px; color:#4a6ee0; font-weight:bold;">Reference</td>
                                </tr>
                                <tr><td style="padding:10px;">Nullable</td><td style="padding:10px; color:#ff4b4b;">Yes</td><td style="padding:10px; color:#00d527;">Never</td></tr>
                                <tr><td style="padding:10px;">Reassignable</td><td style="padding:10px; color:#ffca2c;">Yes</td><td style="padding:10px; color:#ff4b4b;">No</td></tr>
                                <tr><td style="padding:10px;">Must init</td><td style="padding:10px;">No</td><td style="padding:10px; color:#00d527;">Yes</td></tr>
                            </table>`,
                        codeExample: "int target = 50;\nint& ref = target;  // ref aliases target\nref = 100;\nstd::cout << target;  // 100\n\n// Const ref for safe, zero-copy parameter passing\nvoid process(const std::vector<int>& vec) {\n    for (const auto& val : vec)\n        std::cout << val << \" \";\n}",
                        codeExplanation: "Const references prevent modification and eliminate copy overhead. They're the modern C++ best practice for large parameter passing.",
                        bestPractices: [
                            "Use const references for read-only parameters of large objects",
                            "Non-const references signal the function modifies the caller's data",
                            "Never return references to local variables"
                        ],
                        startingCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int health = 100;\n    // TODO: Create reference 'h' aliasing 'health'\n    // TODO: Set 'h' to 0 via the reference\n    // TODO: Print 'health' and verify it changed\n    return 0;\n}"
                    }
                ],
                quiz: [
                    { question: "What is the primary cause of a Buffer Overflow?", options: ["Writing data outside allocated array bounds", "Using too many loops", "Failing to compile", "A syntax error"], correctAnswer: 0 },
                    { question: "Which memory region is auto-managed by the CPU for local variables?", options: ["The Heap", "The Stack", "The Virtual Drive", "The Register File"], correctAnswer: 1 },
                    { question: "What keyword allocates memory on the Heap?", options: ["allocate", "malloc", "new", "create"], correctAnswer: 2 },
                    { question: "What happens if you forget to use 'delete' after 'new'?", options: ["Stack Overflow", "Memory Leak", "Compiler Error", "OS auto-deletes it"], correctAnswer: 1 },
                    { question: "If 'ptr' is int* at address 1000, what is ptr + 1 (4-byte int)?", options: ["1001", "1002", "1004", "1008"], correctAnswer: 2 },
                    { question: "Which statement about References is true?", options: ["They can be reassigned", "They can be NULL", "They must be initialized at declaration", "They are slower than pointers"], correctAnswer: 2 },
                    { question: "What is a Dangling Pointer?", options: ["An uninitialized pointer", "A pointer to an array", "A pointer to already-freed memory", "A pointer with no type"], correctAnswer: 2 },
                    { question: "Why set deleted pointers to nullptr?", options: ["To free memory faster", "To optimize CPU", "To prevent access to freed memory", "To close the app"], correctAnswer: 2 },
                    { question: "What uses Last-In-First-Out (LIFO) principle?", options: ["Heap", "Array", "Stack", "Queue"], correctAnswer: 2 },
                    { question: "Which operator accesses the value a pointer points to?", options: ["&", "*", "->", "new"], correctAnswer: 1 }
                ]
            },
            {
                moduleId: 3,
                moduleName: "Module 3: Object-Oriented Design & Security",
                moduleDescription: "Advanced OOP concepts including encapsulation, inheritance, polymorphism, and secure architecture",
                lessons: [
                    {
                        id: 11,
                        title: "Classes & Object-Oriented Architecture",
                        difficulty: "Advanced",
                        estimatedTime: "60 min",
                        keyTerms: ["Class", "Object", "Encapsulation", "Access Modifiers", "Member Functions"],
                        theory: `
                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Classes as Blueprints</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">A <strong>Class</strong> defines structure and behavior of objects via member variables, member functions, and access modifiers.</p>
                            <table style="width:100%; border-collapse:collapse; color:#d1d5db; margin-bottom:15px;">
                                <tr style="background:rgba(74,110,224,0.1);"><td style="padding:10px; color:#4a6ee0; font-weight:bold;">Modifier</td><td style="padding:10px; color:#4a6ee0; font-weight:bold;">Class</td><td style="padding:10px; color:#4a6ee0; font-weight:bold;">Subclass</td><td style="padding:10px; color:#4a6ee0; font-weight:bold;">Outside</td></tr>
                                <tr><td style="padding:10px; color:#00d527;">public</td><td style="padding:10px;">✓</td><td style="padding:10px;">✓</td><td style="padding:10px;">✓</td></tr>
                                <tr><td style="padding:10px; color:#ffca2c;">protected</td><td style="padding:10px;">✓</td><td style="padding:10px;">✓</td><td style="padding:10px;">✗</td></tr>
                                <tr><td style="padding:10px; color:#ff4b4b;">private</td><td style="padding:10px;">✓</td><td style="padding:10px;">✗</td><td style="padding:10px;">✗</td></tr>
                            </table>`,
                        codeExample: "class Server {\nprivate:\n    std::string ip_address;\n    int port;\npublic:\n    Server(const std::string& ip, int p) : ip_address(ip), port(p) {}\n    void connect() {\n        std::cout << \"Connecting to \" << this->ip_address << \":\" << port;\n    }\n    std::string getIP() const { return ip_address; }\n};\n\nint main() {\n    Server db(\"192.168.1.1\", 3306);\n    db.connect();\n}",
                        codeExplanation: "Private data can only be accessed through the public interface, enabling validation and invariant enforcement.",
                        bestPractices: [
                            "Use public methods to expose interface, private for implementation",
                            "Initialize members in constructor initializer lists",
                            "Mark const methods that don't modify state"
                        ],
                        startingCode: "#include <iostream>\nusing namespace std;\n\n// TODO: Create class 'User' with private 'name'\n// TODO: Public getter and parameterized constructor\n\nint main() {\n    // User obj(\"Alice\");\n    // cout << obj.getName();\n    return 0;\n}"
                    },
                    {
                        id: 12,
                        title: "Encapsulation & Defensive Programming",
                        difficulty: "Advanced",
                        estimatedTime: "55 min",
                        keyTerms: ["Encapsulation", "Data Hiding", "Getter/Setter", "Validation", "Invariants"],
                        theory: `
                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Encapsulation as a Security Checkpoint</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;"><strong>Encapsulation</strong> hides internal state and forces modifications through a controlled interface. Setter functions validate data before applying it — preventing injection attacks and invalid states.</p>
                            <div style="background: rgba(0,213,39,0.15); border-left: 4px solid #00d527; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #00d527; font-weight: bold; margin-bottom: 10px;">🛡️ Defensive Programming Strategy</p>
                                <ul style="color:#d1d5db; padding-left:20px; margin:0;">
                                    <li>Validate All Inputs — bounds, type, and format</li>
                                    <li>Enforce Invariants — keep class state always valid</li>
                                    <li>Fail Securely — reject invalid ops, don't corrupt state</li>
                                    <li>Principle of Least Privilege — grant minimal access</li>
                                </ul>
                            </div>`,
                        codeExample: "class BankAccount {\nprivate:\n    double balance = 0.0;\n    bool validateAmount(double a) { return a > 0; }\npublic:\n    bool withdraw(double amount) {\n        if (!validateAmount(amount) || amount > balance) {\n            std::cerr << \"Invalid withdrawal\\n\";\n            return false;\n        }\n        balance -= amount;\n        return true;\n    }\n    double getBalance() const { return balance; }\n};",
                        codeExplanation: "Encapsulated data cannot violate invariants. External code cannot set balance to negative.",
                        bestPractices: [
                            "Validate in setters, not getters",
                            "Log validation failures for security audit trails",
                            "Define what constitutes invalid state and prevent it"
                        ],
                        startingCode: "#include <iostream>\n#include <string>\nusing namespace std;\n\n// TODO: Create Account class with password field\n// TODO: Setter with strength validation (min 8 chars + digits)\n\nint main() { return 0; }"
                    },
                    {
                        id: 13,
                        title: "Constructors, Destructors & RAII",
                        difficulty: "Advanced",
                        estimatedTime: "55 min",
                        keyTerms: ["Constructor", "Destructor", "RAII", "Resource Management", "Initialization"],
                        theory: `
                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">RAII: Resource Acquisition Is Initialization</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">The core design pattern of modern C++. Resources are acquired in the constructor and released in the destructor — guaranteeing cleanup even if an exception occurs.</p>
                            <div style="background: rgba(0,213,39,0.15); border-left: 4px solid #00d527; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #00d527; font-weight: bold; margin-bottom: 8px;">✨ RAII Advantage</p>
                                <p style="color: #d1d5db; margin: 0;">The destructor executes regardless of how scope exits: normal return, exception, early return. Zero resource leaks.</p>
                            </div>`,
                        codeExample: "class FileStream {\n    FILE* handle;\npublic:\n    FileStream(const char* f) {\n        handle = fopen(f, \"r\");\n        if (!handle) throw std::runtime_error(\"Open failed\");\n    }\n    ~FileStream() {\n        if (handle) fclose(handle); // Always executes\n    }\n    FileStream(const FileStream&) = delete; // No double-close\n};\n\nvoid process() {\n    FileStream file(\"data.txt\"); // Constructor\n    // ... use file ...\n} // Destructor runs here automatically",
                        codeExplanation: "RAII ensures cleanup happens automatically. The modern equivalent uses std::ifstream which closes automatically.",
                        bestPractices: [
                            "Define destructors when holding dynamic memory or system resources",
                            "Use initializer lists for efficient member initialization",
                            "Modern C++: prefer std::unique_ptr and std::shared_ptr"
                        ],
                        startingCode: "#include <iostream>\nusing namespace std;\n\n// TODO: Class with constructor printing \"Resource acquired\"\n// TODO: Destructor printing \"Resource released\"\n\nint main() {\n    { /* Object created here, destroyed at block end */ }\n    return 0;\n}"
                    },
                    {
                        id: 14,
                        title: "Inheritance & Code Reusability",
                        difficulty: "Advanced",
                        estimatedTime: "60 min",
                        keyTerms: ["Inheritance", "Base Class", "Derived Class", "Protected", "IS-A Relationship"],
                        theory: `
                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Inheritance: Extend, Don't Repeat</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;"><strong>Inheritance</strong> lets a Derived class absorb Base class attributes and methods, adding specialization. Follows the DRY (Don't Repeat Yourself) principle.</p>
                            <p style="margin-bottom: 15px; color: #d1d5db; font-family: monospace; background: rgba(255,255,255,0.05); padding: 10px; border-radius: 4px;">
                                Animal (Base)<br/>
                                  ├─ Dog : public Animal<br/>
                                  ├─ Cat : public Animal<br/>
                                  └─ Bird : public Animal
                            </p>`,
                        codeExample: "class Malware {\nprotected:\n    std::string targetIP;\npublic:\n    Malware(const std::string& ip) : targetIP(ip) {}\n    virtual void infect() { std::cout << \"System Compromised\"; }\n};\n\nclass Ransomware : public Malware {\npublic:\n    Ransomware(const std::string& ip) : Malware(ip) {}\n    void infect() override {\n        Malware::infect();\n        std::cout << \" | Files Encrypted.\";\n    }\n};",
                        codeExplanation: "Derived class inherits all public and protected members. The override keyword ensures correct virtual function overriding at compile time.",
                        bestPractices: [
                            "Use public inheritance for IS-A relationships",
                            "Mark base class methods virtual if expecting override",
                            "Use override keyword to catch mistakes at compile time",
                            "Prefer composition over inheritance when HAS-A fits better"
                        ],
                        startingCode: "#include <iostream>\nusing namespace std;\n\n// TODO: Create Animal base class with virtual speak()\n// TODO: Create Dog derived class overriding speak()\n\nint main() { return 0; }"
                    },
                    {
                        id: 15,
                        title: "Polymorphism & Virtual Functions",
                        difficulty: "Advanced",
                        estimatedTime: "60 min",
                        keyTerms: ["Polymorphism", "Virtual Function", "Dynamic Binding", "vtable", "Type Hierarchy"],
                        theory: `
                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Polymorphism: One Interface, Many Forms</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">The <span style="font-family:monospace;">virtual</span> keyword enables runtime dispatch via a hidden <strong>Virtual Method Table (vtable)</strong>. The CPU reads the vtable pointer per object to call the correct derived function.</p>
                            <div style="background: rgba(0,213,39,0.15); border-left: 4px solid #00d527; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #00d527; font-weight: bold; margin-bottom: 8px;">✅ C++ Mastery Milestone</p>
                                <p style="color: #d1d5db; margin: 0;">You now possess comprehensive OOP mastery. Ready for advanced systems development and performance-critical applications.</p>
                            </div>`,
                        codeExample: "class Entity {\npublic:\n    virtual void update(float dt) = 0; // Pure virtual\n    virtual ~Entity() {}               // Virtual destructor essential!\n};\n\nclass Player : public Entity {\npublic:\n    void update(float dt) override { std::cout << \"Player moving\\n\"; }\n};\n\nclass Enemy : public Entity {\npublic:\n    void update(float dt) override { std::cout << \"Enemy attacking\\n\"; }\n};\n\nint main() {\n    std::vector<Entity*> scene = { new Player(), new Enemy() };\n    for (auto e : scene) e->update(0.016f); // Polymorphic dispatch\n}",
                        codeExplanation: "The runtime type determines which update() is called, not the pointer type. vtable lookup adds ~1ns overhead per virtual call.",
                        bestPractices: [
                            "Always define virtual destructors in base classes",
                            "Use override in derived classes (compile-time safety)",
                            "Pure virtual functions create abstract interfaces",
                            "vtables add 8 bytes per object on x64 — consider for embedded targets"
                        ],
                        startingCode: "#include <iostream>\n#include <vector>\nusing namespace std;\n\n// TODO: Abstract Shape class with pure virtual area()\n// TODO: Circle and Square derived classes\n// TODO: Store in vector and polymorphically calculate areas\n\nint main() { return 0; }"
                    }
                ],
                quiz: [
                    { question: "What is Encapsulation?", options: ["Making all variables public", "Hiding internal data and restricting access via methods", "Deleting objects", "Multiple inheritance"], correctAnswer: 1 },
                    { question: "Which keyword limits access to within the class only?", options: ["public", "protected", "private", "virtual"], correctAnswer: 2 },
                    { question: "What is a Constructor?", options: ["Destroys objects", "Called automatically upon object instantiation", "Holds memory address", "A keyword for inheritance"], correctAnswer: 1 },
                    { question: "What character designates a Destructor?", options: ["*", "&", "~", "!"], correctAnswer: 2 },
                    { question: "What does 'protected' allow?", options: ["Access by anything", "Access within class and derived classes only", "No access", "Access only by pointers"], correctAnswer: 1 },
                    { question: "Which keyword enables runtime function resolution?", options: ["static", "virtual", "const", "inline"], correctAnswer: 1 },
                    { question: "What does RAII stand for?", options: ["Random Access Is Impossible", "Read And Initialize Instantly", "Resource Acquisition Is Initialization", "Return Array Index Integer"], correctAnswer: 2 },
                    { question: "How is public inheritance denoted?", options: ["class B inherits A", "class B :: A", "class B : public A", "class B -> A"], correctAnswer: 2 },
                    { question: "What is the primary benefit of Polymorphism?", options: ["Uses less memory", "Uniform interface for diverse types", "Prevents buffer overflows", "Auto cleans memory"], correctAnswer: 1 },
                    { question: "Why validate data in setters?", options: ["Speeds up programs", "Prevents invalid states and injection attacks", "Prints to console", "Replaces constructors"], correctAnswer: 1 }
                ]
            },
            {
                moduleId: 4,
                moduleName: "Module 4: Advanced C++ & Modern Features",
                moduleDescription: "Templates, move semantics, exception handling, STL mastery, and C++20 features",
                lessons: [
                    {
                        id: 16,
                        title: "Templates & Generic Programming",
                        difficulty: "Advanced",
                        estimatedTime: "65 min",
                        keyTerms: ["Templates", "Generics", "Template Specialization", "Template Metaprogramming"],
                        theory: `
                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Templates: Write Once, Compile Many</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Templates enable writing generic code that works with any type. The compiler instantiates separate type-specific versions at compile-time. <strong>Zero runtime overhead</strong> — unlike virtual dispatch.</p>
                            <div style="background: rgba(0,213,39,0.15); border-left: 4px solid #00d527; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #00d527; font-weight: bold; margin-bottom: 8px;">⚡ Templates vs Polymorphism</p>
                                <p style="color: #d1d5db; margin: 0;">Templates use <strong>static dispatch</strong> (compile-time) — faster than virtual function dynamic dispatch. The STL (std::vector, std::map) is built entirely on templates.</p>
                            </div>`,
                        codeExample: "template<typename T>\nT maximum(T a, T b) { return (a > b) ? a : b; }\n\ntemplate<typename T>\nclass Stack {\n    std::vector<T> data;\npublic:\n    void push(const T& val) { data.push_back(val); }\n    T pop() {\n        if (data.empty()) throw std::underflow_error(\"Stack empty\");\n        T val = data.back(); data.pop_back(); return val;\n    }\n    bool empty() const { return data.empty(); }\n};\n\nint main() {\n    std::cout << maximum(5, 10);       // int version\n    std::cout << maximum(3.5, 2.1);    // double version\n    Stack<int> s; s.push(42);\n}",
                        codeExplanation: "Compiler generates separate code for each type. No virtual dispatch, no boxing overhead.",
                        bestPractices: [
                            "Keep template implementations in headers (compiler needs full definition)",
                            "Use static_assert for compile-time type requirements",
                            "Consider Concepts (C++20) for readable template constraints",
                            "Document what operations T must support"
                        ],
                        startingCode: "// TODO: Create a generic swap<T> function template\n// TODO: Create a generic Pair<T,U> class template\n// TODO: Test with int, double, and string types"
                    },
                    {
                        id: 17,
                        title: "Move Semantics & RValue References",
                        difficulty: "Advanced",
                        estimatedTime: "60 min",
                        keyTerms: ["Move Semantics", "RValue Reference", "Perfect Forwarding", "Move Constructor", "std::move"],
                        theory: `
                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">The Copy Problem & Move Solution</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Copying large objects (vectors with millions of elements) is expensive — it duplicates every byte. C++11 introduced <strong>move semantics</strong> to transfer resource ownership in O(1) instead of copying in O(n).</p>
                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">LValue vs RValue</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;"><strong style="color:#ffca2c;">LValue:</strong> Named variable with persistent identity (can take address). <strong style="color:#00d527;">RValue:</strong> Temporary without persistent identity — can be safely moved from.</p>
                            <div style="background: rgba(0,213,39,0.15); border-left: 4px solid #00d527; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #00d527; font-weight: bold; margin-bottom: 8px;">🚀 Performance Impact</p>
                                <p style="color: #d1d5db; margin: 0;">Moving a 10,000-element vector: <strong>O(1)</strong> — just copy the internal pointer. Copying: <strong>O(n)</strong> — allocate and copy all elements. Modern containers are move-aware.</p>
                            </div>`,
                        codeExample: "class Buffer {\n    char* data; size_t size;\npublic:\n    // Copy constructor: O(n)\n    Buffer(const Buffer& o) : size(o.size) {\n        data = new char[size];\n        std::memcpy(data, o.data, size);\n    }\n    // Move constructor: O(1)\n    Buffer(Buffer&& o) noexcept : data(o.data), size(o.size) {\n        o.data = nullptr; // Steal the resource!\n        o.size = 0;\n    }\n    ~Buffer() { delete[] data; }\n};\n\nint main() {\n    Buffer a(/* ... */);\n    Buffer b = std::move(a); // Move, not copy!\n    // a.data is now nullptr — moved from\n}",
                        codeExplanation: "The move constructor steals the internal pointer in O(1). std::move casts to RValue reference, enabling move selection.",
                        bestPractices: [
                            "Mark move constructors noexcept — enables STL optimizations",
                            "After moving, leave source in a valid but unspecified state",
                            "std::unique_ptr uses move semantics automatically",
                            "Rule of Five: define destructor, copy ctor, copy assign, move ctor, move assign"
                        ],
                        startingCode: "// TODO: Implement Buffer class with move constructor\n// TODO: Implement move assignment operator\n// TODO: Verify the moved-from object is in valid state"
                    },
                    {
                        id: 18,
                        title: "Exception Handling & Error Management",
                        difficulty: "Advanced",
                        estimatedTime: "55 min",
                        keyTerms: ["try/catch", "throw", "Exception Safety", "std::exception", "noexcept", "RAII"],
                        theory: `
                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Why Exceptions?</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Error codes are easily ignored. Exceptions <strong>force error handling</strong> and automatically propagate through the call stack until caught. C++ uses <span style="color:#4a6ee0; font-family:monospace;">try/catch/throw</span> for structured error management.</p>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Exception Safety Levels</h3>
                            <ul style="margin-bottom: 15px; color: #d1d5db; padding-left: 20px; list-style-type: disc;">
                                <li style="margin-bottom: 8px;"><strong style="color:#ff4b4b;">No-throw guarantee:</strong> Operation never throws. Use <span style="font-family:monospace;">noexcept</span>.</li>
                                <li style="margin-bottom: 8px;"><strong style="color:#ffca2c;">Strong guarantee:</strong> On failure, state rolls back to pre-call state.</li>
                                <li style="margin-bottom: 8px;"><strong style="color:#00d527;">Basic guarantee:</strong> On failure, no leaks, program in valid (possibly different) state.</li>
                                <li style="margin-bottom: 8px;"><strong style="color:#d1d5db;">No guarantee:</strong> Avoid — undefined behavior on failure.</li>
                            </ul>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Exception Hierarchy</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; font-family: monospace; background: rgba(255,255,255,0.05); padding: 10px; border-radius: 4px; line-height: 1.8;">
                                std::exception<br/>
                                  ├─ std::runtime_error<br/>
                                  │    ├─ std::overflow_error<br/>
                                  │    └─ std::underflow_error<br/>
                                  └─ std::logic_error<br/>
                                       ├─ std::invalid_argument<br/>
                                       └─ std::out_of_range
                            </p>

                            <div style="background: rgba(255,202,44,0.15); border-left: 4px solid #ffca2c; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #ffca2c; font-weight: bold; margin-bottom: 8px;">⚡ RAII + Exceptions = Safety</p>
                                <p style="color: #d1d5db; margin: 0;">When an exception unwinds the stack, destructors of all local objects execute automatically. RAII classes (unique_ptr, fstream) guarantee cleanup even mid-exception — no resource leaks.</p>
                            </div>`,
                        codeExample: "// Custom exception hierarchy\nclass NetworkError : public std::runtime_error {\n    int errorCode;\npublic:\n    NetworkError(const std::string& msg, int code)\n        : std::runtime_error(msg), errorCode(code) {}\n    int getCode() const noexcept { return errorCode; }\n};\n\nvoid connectToServer(const std::string& ip) {\n    if (ip.empty())\n        throw std::invalid_argument(\"IP cannot be empty\");\n    if (ip == \"0.0.0.0\")\n        throw NetworkError(\"Connection refused\", 111);\n    std::cout << \"Connected to \" << ip << \"\\n\";\n}\n\nint main() {\n    try {\n        connectToServer(\"0.0.0.0\");\n    } catch (const NetworkError& e) {\n        std::cerr << \"Network error [\" << e.getCode() << \"]: \" << e.what() << \"\\n\";\n    } catch (const std::exception& e) {\n        std::cerr << \"Error: \" << e.what() << \"\\n\";\n    } catch (...) {\n        std::cerr << \"Unknown exception caught\\n\";\n    }\n    return 0;\n}",
                        codeExplanation: "Catch by const reference to avoid slicing. Order matters — catch specific types before general. The <span style=\"font-family:monospace;\">...</span> catch-all is a last resort safety net.",
                        bestPractices: [
                            "Catch exceptions by const reference: catch(const std::exception& e)",
                            "Create a custom exception hierarchy for domain-specific errors",
                            "Mark non-throwing functions noexcept for performance and clarity",
                            "Never throw in destructors — it causes std::terminate",
                            "Use RAII to make code exception-safe automatically"
                        ],
                        startingCode: "#include <iostream>\n#include <stdexcept>\nusing namespace std;\n\n// TODO: Create a divide(int a, int b) function\n// TODO: Throw std::invalid_argument if b == 0\n// TODO: Call it in a try/catch block and handle the exception\n\nint main() { return 0; }"
                    },
                    {
                        id: 19,
                        title: "Standard Template Library (STL) Mastery",
                        difficulty: "Advanced",
                        estimatedTime: "65 min",
                        keyTerms: ["STL", "Containers", "Iterators", "Algorithms", "Ranges", "Complexity Guarantees"],
                        theory: `
                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">The STL Architecture</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">The <strong>Standard Template Library</strong> consists of three interoperable components: <strong>Containers</strong> (data storage), <strong>Iterators</strong> (traversal), and <strong>Algorithms</strong> (operations). They compose via a unified iterator interface.</p>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Container Complexity Reference</h3>
                            <table style="width:100%; border-collapse:collapse; color:#d1d5db; margin-bottom:15px; font-size:13px;">
                                <tr style="background:rgba(74,110,224,0.1);">
                                    <td style="padding:9px; color:#4a6ee0; font-weight:bold;">Container</td>
                                    <td style="padding:9px; color:#4a6ee0; font-weight:bold;">Access</td>
                                    <td style="padding:9px; color:#4a6ee0; font-weight:bold;">Insert</td>
                                    <td style="padding:9px; color:#4a6ee0; font-weight:bold;">Find</td>
                                    <td style="padding:9px; color:#4a6ee0; font-weight:bold;">Use When</td>
                                </tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                                    <td style="padding:9px; color:#ffca2c;">std::vector</td>
                                    <td style="padding:9px;">O(1)</td>
                                    <td style="padding:9px;">O(1) amort.</td>
                                    <td style="padding:9px;">O(n)</td>
                                    <td style="padding:9px;">Default sequential container</td>
                                </tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                                    <td style="padding:9px; color:#ffca2c;">std::unordered_map</td>
                                    <td style="padding:9px;">—</td>
                                    <td style="padding:9px;">O(1) avg.</td>
                                    <td style="padding:9px;">O(1) avg.</td>
                                    <td style="padding:9px;">Fast key-value lookup</td>
                                </tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                                    <td style="padding:9px; color:#ffca2c;">std::set</td>
                                    <td style="padding:9px;">—</td>
                                    <td style="padding:9px;">O(log n)</td>
                                    <td style="padding:9px;">O(log n)</td>
                                    <td style="padding:9px;">Sorted unique elements</td>
                                </tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                                    <td style="padding:9px; color:#ffca2c;">std::deque</td>
                                    <td style="padding:9px;">O(1)</td>
                                    <td style="padding:9px;">O(1) both ends</td>
                                    <td style="padding:9px;">O(n)</td>
                                    <td style="padding:9px;">Queue/stack operations</td>
                                </tr>
                                <tr>
                                    <td style="padding:9px; color:#ffca2c;">std::list</td>
                                    <td style="padding:9px;">O(n)</td>
                                    <td style="padding:9px;">O(1) anywhere</td>
                                    <td style="padding:9px;">O(n)</td>
                                    <td style="padding:9px;">Frequent mid-insertion</td>
                                </tr>
                            </table>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Algorithms & Lambdas</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;"><span style="color:#4a6ee0; font-family:monospace;">&lt;algorithm&gt;</span> provides 100+ battle-tested algorithms: sort, find, transform, partition, accumulate. Combined with lambdas, they replace most hand-written loops.</p>

                            <div style="background: rgba(74,110,224,0.15); border-left: 4px solid #4a6ee0; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #4a6ee0; font-weight: bold; margin-bottom: 8px;">🔧 C++20 Ranges</p>
                                <p style="color: #d1d5db; margin: 0;">Ranges compose algorithms lazily without creating intermediate containers. <span style="font-family:monospace;">views::filter | views::transform | views::take</span> creates a pipeline executed on demand.</p>
                            </div>`,
                        codeExample: "#include <vector>\n#include <algorithm>\n#include <unordered_map>\n#include <numeric>\n\nint main() {\n    std::vector<int> scores = {85, 42, 93, 67, 58, 91};\n\n    // Sort descending\n    std::sort(scores.begin(), scores.end(), std::greater<int>());\n\n    // Filter scores > 80 with transform\n    std::vector<int> high;\n    std::copy_if(scores.begin(), scores.end(),\n                 std::back_inserter(high),\n                 [](int s) { return s > 80; });\n\n    // Accumulate average\n    double avg = std::accumulate(scores.begin(), scores.end(), 0.0) / scores.size();\n\n    // Word frequency counter with unordered_map\n    std::unordered_map<std::string, int> freq;\n    std::vector<std::string> words = {\"cat\", \"dog\", \"cat\", \"bird\", \"dog\", \"cat\"};\n    for (const auto& w : words) freq[w]++;\n\n    for (const auto& [word, count] : freq)  // C++17 structured bindings\n        std::cout << word << \": \" << count << \"\\n\";\n\n    return 0;\n}",
                        codeExplanation: "The lambda <span style=\"font-family:monospace;\">[](int s){ return s > 80; }</span> captures nothing and acts as an inline predicate. Structured bindings (C++17) unpack pairs cleanly.",
                        bestPractices: [
                            "Prefer std::vector as your default container — cache-friendly and fast",
                            "Use std::unordered_map for O(1) average key lookup",
                            "Prefer algorithm functions over hand-written loops — communicates intent",
                            "Reserve vector capacity upfront to avoid reallocations: v.reserve(1000)",
                            "Use emplace_back over push_back to construct in-place"
                        ],
                        startingCode: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> nums = {5, 2, 8, 1, 9, 3, 7, 4, 6};\n    // TODO: Sort nums ascending using std::sort\n    // TODO: Find the first element > 6 using std::find_if\n    // TODO: Compute the sum using std::accumulate\n    // TODO: Print results\n    return 0;\n}"
                    },
                    {
                        id: 20,
                        title: "C++20 Features & Modern Best Practices",
                        difficulty: "Advanced",
                        estimatedTime: "70 min",
                        keyTerms: ["Concepts", "Coroutines", "Modules", "Ranges", "std::span", "Three-Way Comparison"],
                        theory: `
                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">C++20: The Biggest Leap Since C++11</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">C++20 introduced four major features that reshape how modern C++ is written: <strong>Concepts</strong>, <strong>Coroutines</strong>, <strong>Modules</strong>, and <strong>Ranges</strong>.</p>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Concepts: Constrained Templates</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Concepts replace SFINAE with readable compile-time constraints. Template errors become clear English messages instead of 300-line cryptic dumps.</p>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Coroutines: Cooperative Multitasking</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Coroutines are functions that can suspend and resume execution. Enables async I/O, generators, and state machines without threads. <span style="font-family:monospace;">co_await</span>, <span style="font-family:monospace;">co_yield</span>, <span style="font-family:monospace;">co_return</span>.</p>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">std::span: Safe Array Views</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;"><span style="font-family:monospace; color:#4a6ee0;">std::span&lt;T&gt;</span> is a non-owning view into contiguous memory. Eliminates raw pointer + size pairs safely.</p>

                            <h3 style="color: #4a6ee0; margin-bottom: 12px;">Three-Way Comparison Operator (spaceship)</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">The <span style="font-family:monospace; color:#ffca2c;">&lt;=&gt;</span> operator auto-generates all six comparison operators from one definition.</p>

                            <div style="background: rgba(0,213,39,0.15); border-left: 4px solid #00d527; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #00d527; font-weight: bold; margin-bottom: 10px;">🏆 Congratulations: C++ Mastery Complete</p>
                                <p style="color: #d1d5db; line-height: 1.6; margin: 0;">You've completed the full C++ curriculum — from raw memory addresses and pointer arithmetic to modern C++20 features. You're equipped for systems programming, game engines, embedded development, and security research at a professional level.</p>
                            </div>`,
                        codeExample: "// CONCEPTS: Constrained template\ntemplate<typename T>\nconcept Numeric = std::integral<T> || std::floating_point<T>;\n\ntemplate<Numeric T>\nT clamp(T value, T lo, T hi) {\n    return std::max(lo, std::min(value, hi));\n}\n\n// RANGES: Lazy pipeline (C++20)\n#include <ranges>\nvoid rangesDemo() {\n    auto nums = std::views::iota(1, 100)     // Generate 1..99\n        | std::views::filter([](int n){ return n % 2 == 0; }) // Even\n        | std::views::transform([](int n){ return n * n; })   // Square\n        | std::views::take(5);               // First 5\n    for (int n : nums) std::cout << n << \" \"; // 4 16 36 64 100\n}\n\n// STD::SPAN: Safe array view\nvoid process(std::span<const int> data) {\n    for (int x : data) std::cout << x << \" \";\n}\n\n// SPACESHIP OPERATOR: Auto-generates all comparisons\nstruct Version {\n    int major, minor, patch;\n    auto operator<=>(const Version&) const = default; // All 6 ops!\n};",
                        codeExplanation: "Concepts provide readable error messages. Ranges avoid temporary containers. std::span replaces (pointer, size) pairs. Spaceship generates <, >, <=, >=, ==, != from one line.",
                        bestPractices: [
                            "Use Concepts to document and enforce template requirements",
                            "Ranges are lazy — chain views without allocating intermediate storage",
                            "Prefer std::span over raw pointers for array parameters",
                            "Use = default for spaceship when default lexicographic comparison fits",
                            "Modules replace header guards in large projects — faster compilation"
                        ],
                        startingCode: "#include <iostream>\n#include <ranges>\n#include <vector>\nusing namespace std;\n\n// TODO: Define a concept 'Printable' that requires operator<<\n// TODO: Create a generic print() function using that concept\n// TODO: Use ranges pipeline to filter/transform a vector\n\nint main() { return 0; }"
                    }
                ],
                quiz: [
                    { question: "What is the main advantage of Templates over virtual functions?", options: ["They allow null pointers", "Zero runtime overhead via compile-time instantiation", "They are easier to read", "They work only with integers"], correctAnswer: 1 },
                    { question: "What does std::move() do to its argument?", options: ["Physically moves memory", "Casts to RValue reference to enable move semantics", "Deletes the argument", "Copies the argument"], correctAnswer: 1 },
                    { question: "Which is NOT a valid exception safety guarantee?", options: ["Strong guarantee", "No-throw guarantee", "Basic guarantee", "Silent guarantee"], correctAnswer: 3 },
                    { question: "What is the average complexity of std::unordered_map lookup?", options: ["O(n)", "O(log n)", "O(1)", "O(n²)"], correctAnswer: 2 },
                    { question: "What does the noexcept specifier communicate?", options: ["The function uses exceptions internally", "The function never throws an exception", "The function is not compiled", "The function is deprecated"], correctAnswer: 1 },
                    { question: "What C++20 feature replaces cryptic SFINAE template errors with readable constraints?", options: ["Modules", "Coroutines", "Concepts", "Ranges"], correctAnswer: 2 },
                    { question: "What is std::span?", options: ["A threading primitive", "A non-owning view into contiguous memory", "A smart pointer", "A sorted container"], correctAnswer: 1 },
                    { question: "What is the C++20 spaceship operator?", options: ["A pointer arithmetic tool", "A memory allocator", "An operator that auto-generates all six comparison operators", "A move semantic helper"], correctAnswer: 2 },
                    { question: "What does catching (...) handle?", options: ["Only std::exception", "Only runtime errors", "Any exception type including unknown ones", "Nothing — it's invalid syntax"], correctAnswer: 2 },
                    { question: "What is a Coroutine?", options: ["A function that never returns", "A function that can suspend and resume execution", "A templated lambda", "A virtual base class method"], correctAnswer: 1 }
                ]
            }
        ]
    },


    /* ═══════════════════════════════════════════════════════════════════
       PYTHON COURSE
    ═══════════════════════════════════════════════════════════════════ */
    "python-programming": {
        id: "python-programming",
        title: "Python: Data, Automation & AI",
        description: "Master Python from fundamentals to advanced topics including OOP, data analysis, automation, and machine learning foundations",
        totalLessons: 20,
        difficulty: "Beginner–Advanced",
        prerequisites: ["Basic computer literacy", "Understanding of logic"],
        modules: [
            {
                moduleId: 1,
                moduleName: "Module 1: Python Foundations",
                moduleDescription: "Variables, control flow, functions, and Python's unique design philosophy",
                lessons: [
                    {
                        id: 1,
                        title: "Python Philosophy & Dynamic Typing",
                        difficulty: "Beginner",
                        estimatedTime: "40 min",
                        keyTerms: ["Dynamic Typing", "Interpreted Language", "Duck Typing", "REPL", "PEP 8"],
                        theory: `
                            <h3 style="color: #f5a623; margin-bottom: 12px;">Why Python?</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Python is an <strong>interpreted, dynamically-typed</strong> language designed for readability. The guiding philosophy: <em>"There should be one — and preferably only one — obvious way to do it."</em> Python code reads almost like English.</p>

                            <h3 style="color: #f5a623; margin-bottom: 12px;">Dynamic Typing Explained</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Unlike C++, Python variables have no fixed type. The type is determined at runtime by the value assigned. You can reassign a variable from an integer to a string freely.</p>

                            <h3 style="color: #f5a623; margin-bottom: 12px;">Duck Typing</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;"><em>"If it walks like a duck and quacks like a duck, it's a duck."</em> Python checks what an object can <strong>do</strong>, not what it <strong>is</strong>. Any object with a <span style="font-family:monospace; color:#f5a623;">__len__</span> method works with <span style="font-family:monospace; color:#f5a623;">len()</span>.</p>

                            <h3 style="color: #f5a623; margin-bottom: 12px;">The Execution Model</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Python source is compiled to <strong>bytecode</strong> (.pyc) and executed by the CPython VM. No separate compile step — run directly with <span style="font-family:monospace;">python script.py</span>. The REPL (Read-Eval-Print-Loop) enables instant experimentation.</p>

                            <div style="background: rgba(245,166,35,0.15); border-left: 4px solid #f5a623; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #f5a623; font-weight: bold; margin-bottom: 8px;">📖 PEP 8: Python Style Guide</p>
                                <p style="color: #d1d5db; margin: 0;">4-space indentation. 79-char line limit. snake_case for variables/functions, PascalCase for classes. The community strictly follows PEP 8 — readable code is a first-class concern.</p>
                            </div>`,
                        codeExample: "# Dynamic typing: no type declarations needed\nname = \"Alice\"         # str\nage = 30               # int\nheight = 1.75          # float\nis_active = True       # bool\n\nprint(type(name))      # <class 'str'>\nprint(type(age))       # <class 'int'>\n\n# Reassign to different type freely\nname = 42              # now int — valid in Python!\n\n# f-strings: modern string interpolation\nuser = \"Alice\"\nscore = 98.5\nprint(f\"Player {user} scored {score:.1f} points\")\n# Output: Player Alice scored 98.5 points",
                        codeExplanation: "Python infers types from assigned values. f-strings (f\"\") are the modern, fast way to interpolate variables. The <span style=\"font-family:monospace;\">:.1f</span> format specifier rounds to 1 decimal.",
                        bestPractices: [
                            "Use type hints (PEP 484) for larger codebases: def greet(name: str) -> str:",
                            "Follow PEP 8 style — use a linter like flake8 or ruff",
                            "Use f-strings over .format() or % formatting",
                            "Run Python interactively with ipython or Jupyter for exploration"
                        ],
                        startingCode: "# TODO: Create variables for name, age, and city\n# TODO: Print a greeting using an f-string\n# TODO: Print the type of each variable using type()\n\nprint(\"Hello, Python!\")"
                    },
                    {
                        id: 2,
                        title: "Control Flow: Conditions & Loops",
                        difficulty: "Beginner",
                        estimatedTime: "45 min",
                        keyTerms: ["if/elif/else", "for loop", "while loop", "Comprehension", "Truthiness", "range()"],
                        theory: `
                            <h3 style="color: #f5a623; margin-bottom: 12px;">Indentation as Syntax</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Python uses <strong>indentation</strong> (not braces) to define code blocks. This enforces readability — misaligned code is a syntax error, not just bad style.</p>

                            <h3 style="color: #f5a623; margin-bottom: 12px;">Python Truthiness</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Python's <strong>falsy</strong> values: <span style="font-family:monospace;">None, 0, 0.0, "", [], {}, set()</span>. Everything else is truthy. This enables idiomatic checks like <span style="font-family:monospace;">if my_list:</span> instead of <span style="font-family:monospace;">if len(my_list) > 0:</span>.</p>

                            <h3 style="color: #f5a623; margin-bottom: 12px;">List Comprehensions</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Python's most distinctive feature — a concise, readable way to build lists in one line. Replaces many for-loop patterns and runs faster than equivalent loops.</p>

                            <div style="background: rgba(245,166,35,0.15); border-left: 4px solid #f5a623; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #f5a623; font-weight: bold; margin-bottom: 8px;">💡 for vs while</p>
                                <p style="color: #d1d5db; margin: 0;">Use <code>for</code> when iterating over a known collection. Use <code>while</code> for condition-driven loops (e.g., game loops, polling). <code>for</code> is idiomatic Python — prefer it 95% of the time.</p>
                            </div>`,
                        codeExample: "# if / elif / else\ngrade = 85\nif grade >= 90:\n    print(\"A\")\nelif grade >= 80:\n    print(\"B\")   # Prints: B\nelse:\n    print(\"Below B\")\n\n# for loop over collection\nfruits = [\"apple\", \"banana\", \"cherry\"]\nfor fruit in fruits:\n    print(fruit.upper())\n\n# range() — generates integers\nfor i in range(1, 6):  # 1, 2, 3, 4, 5\n    print(i)\n\n# List comprehension — pythonic\nsquares = [x**2 for x in range(10)]        # [0,1,4,9,...81]\nevens   = [x for x in range(20) if x % 2 == 0]  # [0,2,4,...18]\n\n# enumerate — index + value together\nfor idx, fruit in enumerate(fruits, start=1):\n    print(f\"{idx}. {fruit}\")",
                        codeExplanation: "List comprehensions are [expression for item in iterable if condition]. enumerate() avoids manual index tracking.",
                        bestPractices: [
                            "Prefer list comprehensions over map/filter for readability",
                            "Use enumerate() instead of range(len(list))",
                            "Use _ for throwaway loop variables: for _ in range(5)",
                            "break, continue, and else on loops are Python-specific — learn them"
                        ],
                        startingCode: "# TODO: Print all even numbers from 1 to 50 using a list comprehension\n# TODO: Use a for loop to print each even number with its index\n# TODO: Write a while loop that counts down from 10 to 1\n\nprint(\"Control Flow Practice\")"
                    },
                    {
                        id: 3,
                        title: "Functions, Closures & Decorators",
                        difficulty: "Intermediate",
                        estimatedTime: "55 min",
                        keyTerms: ["def", "Lambda", "Closure", "Decorator", "*args", "**kwargs", "First-Class Functions"],
                        theory: `
                            <h3 style="color: #f5a623; margin-bottom: 12px;">Functions as First-Class Citizens</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">In Python, functions are <strong>objects</strong>. They can be assigned to variables, passed as arguments, returned from other functions, and stored in data structures. This enables functional programming patterns.</p>

                            <h3 style="color: #f5a623; margin-bottom: 12px;">Closures</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">A <strong>closure</strong> is a function that captures variables from its enclosing scope, even after that scope has finished executing. Used to create factory functions and maintain private state.</p>

                            <h3 style="color: #f5a623; margin-bottom: 12px;">Decorators: Wrapping Functions</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">A <strong>decorator</strong> is a function that takes a function and returns an enhanced version. The <span style="font-family:monospace; color:#f5a623;">@decorator</span> syntax is syntactic sugar for <span style="font-family:monospace;">func = decorator(func)</span>. Used for logging, authentication, caching, and timing.</p>

                            <div style="background: rgba(0,213,39,0.15); border-left: 4px solid #00d527; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #00d527; font-weight: bold; margin-bottom: 8px;">🔑 *args and **kwargs</p>
                                <p style="color: #d1d5db; margin: 0;"><code>*args</code> collects extra positional arguments as a tuple. <code>**kwargs</code> collects extra keyword arguments as a dict. Together they make functions maximally flexible.</p>
                            </div>`,
                        codeExample: "# *args and **kwargs\ndef log(message, *args, level=\"INFO\", **kwargs):\n    print(f\"[{level}] {message}\")\n    if args:   print(\"Extra args:\", args)\n    if kwargs: print(\"Extra kwargs:\", kwargs)\n\nlog(\"User login\", \"audit\", level=\"WARNING\", user_id=42)\n\n# Closure: counter factory\ndef make_counter(start=0):\n    count = start\n    def increment():\n        nonlocal count\n        count += 1\n        return count\n    return increment\n\ncounter = make_counter(10)\nprint(counter())  # 11\nprint(counter())  # 12\n\n# Decorator: timing function execution\nimport time, functools\n\ndef timer(func):\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        start = time.perf_counter()\n        result = func(*args, **kwargs)\n        end = time.perf_counter()\n        print(f\"{func.__name__} took {end-start:.4f}s\")\n        return result\n    return wrapper\n\n@timer\ndef compute(n):\n    return sum(range(n))\n\ncompute(1_000_000)  # Prints execution time",
                        codeExplanation: "functools.wraps preserves the original function's metadata. nonlocal allows modifying enclosing scope variables. The @timer syntax desugars to compute = timer(compute).",
                        bestPractices: [
                            "Always use functools.wraps in decorators to preserve metadata",
                            "Use nonlocal (not global) to modify enclosing scope",
                            "Lambda is for simple one-liners; def for anything complex",
                            "Chain decorators by stacking @ syntax — applied bottom-up"
                        ],
                        startingCode: "# TODO: Create a decorator @validate that checks function arguments are positive\n# TODO: Create a closure make_multiplier(n) that returns a function\n# TODO: Use *args to create a sum_all() function accepting any number of args\n\nprint(\"Functions & Decorators\")"
                    },
                    {
                        id: 4,
                        title: "Data Structures: Lists, Dicts, Sets & Tuples",
                        difficulty: "Intermediate",
                        estimatedTime: "55 min",
                        keyTerms: ["list", "dict", "set", "tuple", "Immutability", "Hashing", "Comprehensions"],
                        theory: `
                            <h3 style="color: #f5a623; margin-bottom: 12px;">Python's Built-in Collections</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Python ships with powerful built-in data structures. Choosing the right one has major performance implications.</p>

                            <table style="width:100%; border-collapse:collapse; color:#d1d5db; margin-bottom:15px; font-size:13px;">
                                <tr style="background:rgba(245,166,35,0.1);">
                                    <td style="padding:9px; color:#f5a623; font-weight:bold;">Type</td>
                                    <td style="padding:9px; color:#f5a623; font-weight:bold;">Ordered</td>
                                    <td style="padding:9px; color:#f5a623; font-weight:bold;">Mutable</td>
                                    <td style="padding:9px; color:#f5a623; font-weight:bold;">Duplicates</td>
                                    <td style="padding:9px; color:#f5a623; font-weight:bold;">Syntax</td>
                                </tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                                    <td style="padding:9px; color:#ffca2c;">list</td><td style="padding:9px;">Yes</td><td style="padding:9px; color:#00d527;">Yes</td><td style="padding:9px;">Yes</td><td style="padding:9px; font-family:monospace;">[1,2,3]</td>
                                </tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                                    <td style="padding:9px; color:#ffca2c;">tuple</td><td style="padding:9px;">Yes</td><td style="padding:9px; color:#ff4b4b;">No</td><td style="padding:9px;">Yes</td><td style="padding:9px; font-family:monospace;">(1,2,3)</td>
                                </tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                                    <td style="padding:9px; color:#ffca2c;">set</td><td style="padding:9px;">No</td><td style="padding:9px; color:#00d527;">Yes</td><td style="padding:9px; color:#ff4b4b;">No</td><td style="padding:9px; font-family:monospace;">{1,2,3}</td>
                                </tr>
                                <tr>
                                    <td style="padding:9px; color:#ffca2c;">dict</td><td style="padding:9px;">Yes*</td><td style="padding:9px; color:#00d527;">Yes</td><td style="padding:9px;">Keys: No</td><td style="padding:9px; font-family:monospace;">{"k":v}</td>
                                </tr>
                            </table>

                            <div style="background: rgba(245,166,35,0.15); border-left: 4px solid #f5a623; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #f5a623; font-weight: bold; margin-bottom: 8px;">⚡ Performance: set vs list for lookups</p>
                                <p style="color: #d1d5db; margin: 0;"><code>x in my_set</code> is O(1) — hash lookup. <code>x in my_list</code> is O(n) — linear scan. For membership testing, always use a set or dict.</p>
                            </div>`,
                        codeExample: "# List operations\nscores = [95, 87, 72, 88, 95]\nscores.append(100)\nscores.sort(reverse=True)\nprint(scores[:3])  # Top 3 via slicing\n\n# Dict: O(1) key lookup\nstudent = {\"name\": \"Alice\", \"grade\": \"A\", \"score\": 98}\nstudent[\"year\"] = 3          # Add key\nscore = student.get(\"gpa\", 0.0) # Safe get with default\n\n# Dict comprehension\nsquares = {x: x**2 for x in range(1, 6)}\n# {1:1, 2:4, 3:9, 4:16, 5:25}\n\n# Set: unique elements & set operations\na = {1, 2, 3, 4, 5}\nb = {4, 5, 6, 7, 8}\nprint(a & b)  # Intersection: {4, 5}\nprint(a | b)  # Union: {1,2,3,4,5,6,7,8}\nprint(a - b)  # Difference: {1,2,3}\n\n# Tuple unpacking\npoint = (10, 20, 30)\nx, y, z = point       # Unpacking\nfirst, *rest = [1,2,3,4,5]  # Star unpacking",
                        codeExplanation: "Dictionary preserves insertion order (Python 3.7+). Slicing creates a new list — doesn't modify original. Star unpacking (*rest) collects remaining elements.",
                        bestPractices: [
                            "Use dict.get(key, default) instead of dict[key] to avoid KeyError",
                            "Use sets for deduplication and O(1) membership testing",
                            "Prefer tuples for heterogeneous records (lat, lon), lists for homogeneous sequences",
                            "collections.defaultdict and Counter are powerful dict subclasses"
                        ],
                        startingCode: "# TODO: Create a word frequency counter (dict) from a sentence\n# TODO: Find the top 3 most frequent words\n# TODO: Use a set to find unique words\n# sentence = \"the cat sat on the mat the cat ate the rat\"\n\nsentence = \"the cat sat on the mat the cat ate the rat\""
                    },
                    {
                        id: 5,
                        title: "File I/O & Exception Handling",
                        difficulty: "Intermediate",
                        estimatedTime: "50 min",
                        keyTerms: ["open()", "with statement", "try/except", "Context Manager", "CSV", "JSON"],
                        theory: `
                            <h3 style="color: #f5a623; margin-bottom: 12px;">Context Managers & with</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">The <span style="font-family:monospace; color:#f5a623;">with</span> statement ensures resources are properly cleaned up. For files, it guarantees <span style="font-family:monospace;">close()</span> is called even if an exception occurs — Python's equivalent of RAII.</p>

                            <h3 style="color: #f5a623; margin-bottom: 12px;">Exception Hierarchy</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; font-family: monospace; background: rgba(255,255,255,0.05); padding: 10px; border-radius: 4px; line-height: 1.8;">
                                BaseException<br/>
                                  └─ Exception<br/>
                                       ├─ ValueError  — invalid value<br/>
                                       ├─ TypeError   — wrong type<br/>
                                       ├─ FileNotFoundError<br/>
                                       ├─ KeyError    — missing dict key<br/>
                                       └─ IndexError  — out-of-bounds
                            </p>

                            <div style="background: rgba(245,166,35,0.15); border-left: 4px solid #f5a623; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #f5a623; font-weight: bold; margin-bottom: 8px;">🔑 try / except / else / finally</p>
                                <p style="color: #d1d5db; margin: 0;"><code>else</code> runs if NO exception occurred. <code>finally</code> ALWAYS runs — ideal for cleanup. Python has all four clauses, each with distinct purpose.</p>
                            </div>`,
                        codeExample: "import json, csv\n\n# Context manager for safe file I/O\nwith open(\"data.txt\", \"w\") as f:\n    f.write(\"Line 1\\n\")\n    f.write(\"Line 2\\n\")\n# File auto-closed here\n\nwith open(\"data.txt\", \"r\") as f:\n    for line in f:         # Memory-efficient line-by-line\n        print(line.strip())\n\n# JSON read/write\nconfig = {\"host\": \"localhost\", \"port\": 5432, \"debug\": True}\nwith open(\"config.json\", \"w\") as f:\n    json.dump(config, f, indent=2)\n\nwith open(\"config.json\") as f:\n    loaded = json.load(f)\n\n# Full exception handling pattern\ndef parse_age(value):\n    try:\n        age = int(value)\n        if age < 0 or age > 150:\n            raise ValueError(f\"Age {age} out of range\")\n    except ValueError as e:\n        print(f\"Invalid input: {e}\")\n        return None\n    except TypeError:\n        print(\"Input must be a string or number\")\n        return None\n    else:\n        print(f\"Valid age: {age}\")\n        return age\n    finally:\n        print(\"parse_age completed\")",
                        codeExplanation: "The with statement calls __enter__ and __exit__ automatically. else in try/except only runs when no exception was raised — useful for success logic.",
                        bestPractices: [
                            "Always use 'with open()' — never manual file.close()",
                            "Catch specific exceptions, not bare except:",
                            "Use json module for config files instead of custom parsers",
                            "Use csv.DictReader for CSV files with headers",
                            "Raise custom exceptions for domain logic, not generic ValueError"
                        ],
                        startingCode: "import json\n\n# TODO: Write a safe_read_json(filepath) function\n# TODO: Return the parsed data or None on failure\n# TODO: Handle FileNotFoundError and json.JSONDecodeError separately\n# TODO: Log which error occurred\n\ndef safe_read_json(filepath):\n    pass  # Implement here"
                    }
                ],
                quiz: [
                    { question: "What is Duck Typing?", options: ["Type checking at compile time", "Checking what an object can do rather than what it is", "A way to declare variables", "A special Python class"], correctAnswer: 1 },
                    { question: "Which values are Falsy in Python?", options: ["0, None, [], {}, \"\"", "Only False and None", "Only 0 and empty string", "Negative numbers"], correctAnswer: 0 },
                    { question: "What does *args collect in a function?", options: ["Keyword arguments as a dict", "Extra positional arguments as a tuple", "All local variables", "A list of argument names"], correctAnswer: 1 },
                    { question: "What is the time complexity of set membership testing (x in my_set)?", options: ["O(n)", "O(log n)", "O(1)", "O(n²)"], correctAnswer: 2 },
                    { question: "What guarantee does 'with open()' provide?", options: ["Faster file I/O", "File is always closed even if exception occurs", "The file is opened in binary mode", "The file is created if it doesn't exist"], correctAnswer: 1 },
                    { question: "What does a decorator do?", options: ["Adds CSS styling", "Wraps a function to extend or modify its behavior", "Imports a module", "Declares a class"], correctAnswer: 1 },
                    { question: "Which block in try/except runs ONLY when no exception occurs?", options: ["finally", "catch", "else", "clean"], correctAnswer: 2 },
                    { question: "What is a list comprehension?", options: ["A way to sort lists", "A concise syntax to build lists from iterables", "A type of linked list", "A loop that prints lists"], correctAnswer: 1 },
                    { question: "What does nonlocal do inside a nested function?", options: ["Creates a global variable", "Allows modifying a variable in the enclosing (not global) scope", "Deletes the variable", "Makes the variable constant"], correctAnswer: 1 },
                    { question: "Which data structure provides O(1) key-value lookup?", options: ["list", "tuple", "set", "dict"], correctAnswer: 3 }
                ]
            },
            {
                moduleId: 2,
                moduleName: "Module 2: Object-Oriented Python",
                moduleDescription: "Classes, inheritance, magic methods, and Pythonic design patterns",
                lessons: [
                    {
                        id: 6,
                        title: "Classes, Objects & the __init__ Method",
                        difficulty: "Intermediate",
                        estimatedTime: "55 min",
                        keyTerms: ["class", "__init__", "self", "Instance", "Class Variable", "dataclass"],
                        theory: `
                            <h3 style="color: #f5a623; margin-bottom: 12px;">Python OOP Fundamentals</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Python classes bundle state (attributes) and behavior (methods). The <span style="font-family:monospace; color:#f5a623;">__init__</span> method is the constructor. <span style="font-family:monospace; color:#f5a623;">self</span> refers to the current instance — it's passed automatically but must be declared as the first parameter.</p>

                            <h3 style="color: #f5a623; margin-bottom: 12px;">Instance vs Class Variables</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;"><strong>Instance variables</strong> (set via self.x) are unique per object. <strong>Class variables</strong> are shared across all instances — useful for counters, constants, and caches.</p>

                            <div style="background: rgba(245,166,35,0.15); border-left: 4px solid #f5a623; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #f5a623; font-weight: bold; margin-bottom: 8px;">🐍 @dataclass: Modern Python Classes</p>
                                <p style="color: #d1d5db; margin: 0;">Python 3.7+ @dataclass decorator auto-generates __init__, __repr__, and __eq__ from field annotations. Less boilerplate, more readable.</p>
                            </div>`,
                        codeExample: "from dataclasses import dataclass, field\n\nclass BankAccount:\n    bank_name = \"PyBank\"      # Class variable\n    _total_accounts = 0       # Private class variable\n\n    def __init__(self, owner: str, balance: float = 0.0):\n        self.owner = owner         # Instance variable\n        self._balance = balance    # \"Private\" by convention\n        BankAccount._total_accounts += 1\n\n    def deposit(self, amount: float) -> None:\n        if amount <= 0:\n            raise ValueError(\"Amount must be positive\")\n        self._balance += amount\n\n    def get_balance(self) -> float:\n        return self._balance\n\n    @classmethod\n    def get_total_accounts(cls) -> int:\n        return cls._total_accounts\n\n    @staticmethod\n    def validate_pin(pin: str) -> bool:\n        return len(pin) == 4 and pin.isdigit()\n\n    def __repr__(self) -> str:\n        return f\"BankAccount(owner={self.owner!r}, balance={self._balance:.2f})\"\n\n# @dataclass version — far less code\n@dataclass\nclass Point:\n    x: float\n    y: float\n    label: str = \"origin\"\n\n    def distance_to(self, other: 'Point') -> float:\n        return ((self.x-other.x)**2 + (self.y-other.y)**2)**0.5\n\np = Point(3.0, 4.0, \"A\")\nprint(p)  # Point(x=3.0, y=4.0, label='A')",
                        codeExplanation: "@classmethod receives the class (cls) instead of instance. @staticmethod receives neither — a utility function logically grouped in the class.",
                        bestPractices: [
                            "Use @dataclass for simple data containers — eliminates boilerplate",
                            "Prefix private attributes with _ (convention) or __ (name mangling)",
                            "Use type hints in __init__ signatures for documentation and IDE support",
                            "Define __repr__ for meaningful debugging output"
                        ],
                        startingCode: "from dataclasses import dataclass\n\n# TODO: Create a Student class with name, grade, and GPA\n# TODO: Add a method is_honor_roll() that returns True if GPA >= 3.7\n# TODO: Add __repr__ that shows name and GPA\n# TODO: Create 3 Student instances and print them\n\nclass Student:\n    pass"
                    },
                    {
                        id: 7,
                        title: "Inheritance, super() & Mixins",
                        difficulty: "Intermediate",
                        estimatedTime: "60 min",
                        keyTerms: ["Inheritance", "super()", "Method Resolution Order", "Mixin", "Abstract Class", "ABC"],
                        theory: `
                            <h3 style="color: #f5a623; margin-bottom: 12px;">Python Inheritance & super()</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Python supports <strong>multiple inheritance</strong>. The <span style="font-family:monospace; color:#f5a623;">super()</span> function navigates the <strong>Method Resolution Order (MRO)</strong> — a C3 linearization of the inheritance graph ensuring each class is visited once.</p>

                            <h3 style="color: #f5a623; margin-bottom: 12px;">Abstract Base Classes (ABC)</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">The <span style="font-family:monospace;">abc</span> module enables abstract classes. Any class inheriting an ABC must implement all abstract methods — enforced at instantiation time.</p>

                            <h3 style="color: #f5a623; margin-bottom: 12px;">Mixins: Composable Behaviors</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">A <strong>Mixin</strong> is a class that adds a behavior without being a full standalone class. Used with multiple inheritance to compose features like logging, serialization, or caching onto any class.</p>`,
                        codeExample: "from abc import ABC, abstractmethod\n\n# Abstract base class — cannot instantiate directly\nclass Shape(ABC):\n    @abstractmethod\n    def area(self) -> float: ...\n\n    @abstractmethod\n    def perimeter(self) -> float: ...\n\n    def describe(self) -> str:\n        return f\"{type(self).__name__}: area={self.area():.2f}\"\n\nclass Circle(Shape):\n    def __init__(self, radius: float):\n        self.radius = radius\n    def area(self) -> float:\n        import math\n        return math.pi * self.radius**2\n    def perimeter(self) -> float:\n        import math\n        return 2 * math.pi * self.radius\n\n# Mixin pattern\nclass JSONMixin:\n    def to_json(self) -> str:\n        import json\n        return json.dumps(self.__dict__)\n\nclass LoggingMixin:\n    def log(self, msg: str) -> None:\n        print(f\"[{type(self).__name__}] {msg}\")\n\n# Multiple inheritance via Mixins\nclass TrackedCircle(Circle, JSONMixin, LoggingMixin):\n    def __init__(self, radius):\n        super().__init__(radius)  # super() follows MRO\n\ntc = TrackedCircle(5)\ntc.log(f\"Created with area {tc.area():.2f}\")\nprint(tc.to_json())\nprint(TrackedCircle.__mro__)  # See MRO chain",
                        codeExplanation: "super() with no arguments automatically resolves to the next class in MRO. Mixins have no __init__ — they're pure behavior additions.",
                        bestPractices: [
                            "Use ABC to enforce interface contracts in team codebases",
                            "Mixins should be named XMixin and have no __init__",
                            "Check MRO with ClassName.__mro__ to understand resolution",
                            "Prefer composition over deep inheritance hierarchies"
                        ],
                        startingCode: "from abc import ABC, abstractmethod\n\n# TODO: Create abstract Vehicle class with abstract methods drive() and fuel_type()\n# TODO: Create Car and ElectricCar subclasses\n# TODO: Create a LoggingMixin that logs each method call\n# TODO: Create LoggedCar using multiple inheritance\n\nclass Vehicle(ABC):\n    pass"
                    },
                    {
                        id: 8,
                        title: "Magic Methods & Operator Overloading",
                        difficulty: "Advanced",
                        estimatedTime: "55 min",
                        keyTerms: ["Dunder Methods", "__str__", "__len__", "__eq__", "__iter__", "Protocol"],
                        theory: `
                            <h3 style="color: #f5a623; margin-bottom: 12px;">Dunder Methods: Python's Protocol System</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;"><strong>Dunder (double underscore) methods</strong> are Python's hook system. Implementing them integrates your class with Python's built-in operators and functions. This is the foundation of Python's Protocol-based design.</p>

                            <table style="width:100%; border-collapse:collapse; color:#d1d5db; margin-bottom:15px; font-size:13px;">
                                <tr style="background:rgba(245,166,35,0.1);">
                                    <td style="padding:9px; color:#f5a623; font-weight:bold;">Method</td>
                                    <td style="padding:9px; color:#f5a623; font-weight:bold;">Triggered By</td>
                                    <td style="padding:9px; color:#f5a623; font-weight:bold;">Use Case</td>
                                </tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:9px; font-family:monospace;">__init__</td><td style="padding:9px;">Constructor</td><td style="padding:9px;">Initialize instance</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:9px; font-family:monospace;">__str__</td><td style="padding:9px;">str(obj), print</td><td style="padding:9px;">Human-readable string</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:9px; font-family:monospace;">__repr__</td><td style="padding:9px;">repr(obj), REPL</td><td style="padding:9px;">Debug representation</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:9px; font-family:monospace;">__len__</td><td style="padding:9px;">len(obj)</td><td style="padding:9px;">Container size</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:9px; font-family:monospace;">__add__</td><td style="padding:9px;">obj + other</td><td style="padding:9px;">Addition operator</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:9px; font-family:monospace;">__iter__</td><td style="padding:9px;">for x in obj</td><td style="padding:9px;">Iteration protocol</td></tr>
                                <tr><td style="padding:9px; font-family:monospace;">__getitem__</td><td style="padding:9px;">obj[key]</td><td style="padding:9px;">Index/key access</td></tr>
                            </table>`,
                        codeExample: "class Vector:\n    def __init__(self, x: float, y: float):\n        self.x, self.y = x, y\n\n    def __repr__(self) -> str:\n        return f\"Vector({self.x}, {self.y})\"\n\n    def __str__(self) -> str:\n        return f\"({self.x}i + {self.y}j)\"\n\n    def __add__(self, other: 'Vector') -> 'Vector':\n        return Vector(self.x + other.x, self.y + other.y)\n\n    def __mul__(self, scalar: float) -> 'Vector':\n        return Vector(self.x * scalar, self.y * scalar)\n\n    def __abs__(self) -> float:\n        return (self.x**2 + self.y**2)**0.5\n\n    def __eq__(self, other: object) -> bool:\n        if not isinstance(other, Vector): return NotImplemented\n        return self.x == other.x and self.y == other.y\n\n    def __iter__(self):   # Makes Vector unpackable\n        yield self.x\n        yield self.y\n\nv1 = Vector(3, 4)\nv2 = Vector(1, 2)\nprint(v1 + v2)    # (4i + 6j)\nprint(abs(v1))    # 5.0\nx, y = v1         # Unpacking via __iter__\nprint(x, y)       # 3 4",
                        codeExplanation: "Returning NotImplemented from comparison methods lets Python try the reflected operation on the other operand. yield in __iter__ creates a generator.",
                        bestPractices: [
                            "Implement __repr__ first — it's the most useful for debugging",
                            "Return NotImplemented from __eq__/__add__ for unknown types",
                            "Implement both __iter__ and __len__ to satisfy the Sequence protocol",
                            "Use @functools.total_ordering to get all comparisons from just __eq__ and __lt__"
                        ],
                        startingCode: "# TODO: Create a Matrix class supporting + (addition) and * (scalar multiply)\n# TODO: Implement __str__ displaying the matrix in grid format\n# TODO: Implement __len__ returning the number of elements\n# TODO: Implement __getitem__ supporting matrix[row][col] access\n\nclass Matrix:\n    def __init__(self, data: list):\n        self.data = data"
                    },
                    {
                        id: 9,
                        title: "Generators, Iterators & Lazy Evaluation",
                        difficulty: "Advanced",
                        estimatedTime: "55 min",
                        keyTerms: ["Generator", "yield", "Iterator Protocol", "Lazy Evaluation", "Generator Expression", "send()"],
                        theory: `
                            <h3 style="color: #f5a623; margin-bottom: 12px;">Generators: Lazy Sequences</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">A <strong>generator</strong> produces values one at a time on demand using <span style="font-family:monospace; color:#f5a623;">yield</span>. The function body is paused after each yield and resumed on the next <span style="font-family:monospace;">next()</span> call. Memory stays O(1) regardless of sequence size.</p>

                            <h3 style="color: #f5a623; margin-bottom: 12px;">The Iterator Protocol</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Any object implementing <span style="font-family:monospace;">__iter__()</span> and <span style="font-family:monospace;">__next__()</span> is an iterator. Generators implement this automatically. All built-in loops use the iterator protocol.</p>

                            <div style="background: rgba(0,213,39,0.15); border-left: 4px solid #00d527; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #00d527; font-weight: bold; margin-bottom: 8px;">🚀 Generator vs List: Memory</p>
                                <p style="color: #d1d5db; margin: 0;"><code>list(range(1_000_000))</code> allocates ~8MB. <code>range(1_000_000)</code> is a lazy object using &lt;100 bytes. Generators are essential for streaming, large file processing, and infinite sequences.</p>
                            </div>`,
                        codeExample: "# Simple generator function\ndef fibonacci():\n    a, b = 0, 1\n    while True:          # Infinite sequence — lazy!\n        yield a\n        a, b = b, a + b\n\nfib = fibonacci()\nfirst_10 = [next(fib) for _ in range(10)]\nprint(first_10)  # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]\n\n# Generator expression — like list comprehension but lazy\nlarge_squares = (x**2 for x in range(1_000_000))\nprint(next(large_squares))  # 0  (only computes one value)\n\n# Pipeline of generators — very memory efficient\ndef read_lines(filename):\n    with open(filename) as f:\n        yield from f\n\ndef parse_csv(lines):\n    for line in lines:\n        yield line.strip().split(\",\")\n\ndef filter_active(records):\n    for record in records:\n        if record[-1] == \"active\":\n            yield record\n\n# Chain: read → parse → filter — O(1) memory\n# pipeline = filter_active(parse_csv(read_lines(\"users.csv\")))\n\n# yield from: delegate to sub-generator\ndef chain(*iterables):\n    for it in iterables:\n        yield from it\n\nprint(list(chain([1,2], [3,4], [5])))",
                        codeExplanation: "yield from delegates to a sub-generator, forwarding all yields automatically. Generator pipelines process streaming data with constant memory.",
                        bestPractices: [
                            "Use generators for large or infinite sequences — never build the full list",
                            "Use yield from to compose generators cleanly",
                            "Generator expressions (x for x in ...) are memory-efficient alternatives to list comprehensions",
                            "Use itertools module for advanced iteration: chain, islice, groupby, product"
                        ],
                        startingCode: "# TODO: Create a generator read_large_file(path) that yields lines without loading all\n# TODO: Create a generator prime_numbers() producing infinite primes\n# TODO: Use itertools.islice to get first 20 primes\n\nimport itertools\n\ndef prime_numbers():\n    pass  # Implement: infinite prime generator"
                    },
                    {
                        id: 10,
                        title: "Context Managers & Property Decorators",
                        difficulty: "Advanced",
                        estimatedTime: "50 min",
                        keyTerms: ["contextlib", "__enter__", "__exit__", "@property", "@setter", "contextmanager"],
                        theory: `
                            <h3 style="color: #f5a623; margin-bottom: 12px;">Custom Context Managers</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Implement <span style="font-family:monospace;">__enter__</span> and <span style="font-family:monospace;">__exit__</span> for class-based context managers, or use <span style="font-family:monospace;">@contextlib.contextmanager</span> decorator for generator-based ones — much simpler.</p>

                            <h3 style="color: #f5a623; margin-bottom: 12px;">@property: Pythonic Getters/Setters</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">The <span style="font-family:monospace; color:#f5a623;">@property</span> decorator exposes a method as an attribute. Adding <span style="font-family:monospace;">@name.setter</span> enables validation on assignment while maintaining the clean <span style="font-family:monospace;">obj.attr = value</span> syntax.</p>

                            <div style="background: rgba(245,166,35,0.15); border-left: 4px solid #f5a623; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #f5a623; font-weight: bold; margin-bottom: 8px;">🐍 Pythonic Encapsulation</p>
                                <p style="color: #d1d5db; margin: 0;">Start with simple public attributes. Add @property validation later without changing the API. This is the Python approach — don't prematurely add getters/setters.</p>
                            </div>`,
                        codeExample: "from contextlib import contextmanager\nimport time\n\n# Generator-based context manager — clean and simple\n@contextmanager\ndef timer(label: str):\n    start = time.perf_counter()\n    try:\n        yield               # Code inside 'with' block runs here\n    finally:\n        elapsed = time.perf_counter() - start\n        print(f\"{label}: {elapsed:.4f}s\")\n\nwith timer(\"Matrix multiply\"):\n    result = sum(i*i for i in range(1_000_000))\n\n# @property: computed attribute with validation\nclass Temperature:\n    def __init__(self, celsius: float = 0.0):\n        self._celsius = celsius\n\n    @property\n    def celsius(self) -> float:\n        return self._celsius\n\n    @celsius.setter\n    def celsius(self, value: float) -> None:\n        if value < -273.15:\n            raise ValueError(\"Temperature below absolute zero!\")\n        self._celsius = value\n\n    @property\n    def fahrenheit(self) -> float:       # Computed, no setter\n        return self._celsius * 9/5 + 32\n\n    @property\n    def kelvin(self) -> float:\n        return self._celsius + 273.15\n\nt = Temperature(25)\nprint(t.fahrenheit)   # 77.0\nt.celsius = 100       # Setter validates\nprint(t.kelvin)       # 373.15\n# t.fahrenheit = 200  # AttributeError — read-only!",
                        codeExplanation: "The @contextmanager converts a generator into a context manager. yield separates __enter__ (above) from __exit__ (below). @property.setter intercepts attribute assignment.",
                        bestPractices: [
                            "Use @contextmanager for simple context managers — less boilerplate than a class",
                            "Only add @setter when you need validation — don't add it by default",
                            "Read-only properties (no setter) document immutable computed attributes",
                            "Use @cached_property for expensive computed attributes that shouldn't recompute"
                        ],
                        startingCode: "from contextlib import contextmanager\n\n# TODO: Create a context manager @contextmanager 'database_connection()'\n# TODO: Simulate connect on enter, disconnect on finally\n# TODO: Create a Circle class with @property radius that rejects negatives\n# TODO: Add read-only @property area and circumference\n\nclass Circle:\n    pass"
                    }
                ],
                quiz: [
                    { question: "What does 'self' refer to in a Python method?", options: ["The class itself", "The current instance of the class", "The parent class", "A global variable"], correctAnswer: 1 },
                    { question: "What is a Mixin?", options: ["A built-in Python function", "A class that adds behavior via multiple inheritance without being standalone", "A decorator for async functions", "A type of generator"], correctAnswer: 1 },
                    { question: "What does yield do inside a function?", options: ["Returns a value and exits", "Pauses execution and produces a value, resuming on next() call", "Raises an exception", "Creates a new thread"], correctAnswer: 1 },
                    { question: "What does @property enable?", options: ["Async method execution", "Accessing a method like an attribute, with optional validation on assignment", "Class-level caching", "Abstract method declaration"], correctAnswer: 1 },
                    { question: "What is the memory usage of a generator vs a list for 1 million items?", options: ["Generator uses more memory", "Both use the same memory", "Generator uses O(1) memory, list uses O(n)", "Generator caches all values"], correctAnswer: 2 },
                    { question: "What does super() do in Python?", options: ["Calls the global parent class", "Navigates the MRO to call the next class in the hierarchy", "Creates a new superclass", "Bypasses __init__"], correctAnswer: 1 },
                    { question: "Which dunder method is called by len(obj)?", options: ["__size__", "__count__", "__len__", "__length__"], correctAnswer: 2 },
                    { question: "What does @classmethod receive as first argument?", options: ["self (instance)", "cls (the class itself)", "args (arguments tuple)", "None"], correctAnswer: 1 },
                    { question: "What is an Abstract Base Class (ABC)?", options: ["A class that can only have static methods", "A class with abstract methods that subclasses must implement", "A built-in data type", "A class with no __init__"], correctAnswer: 1 },
                    { question: "What does yield from do?", options: ["Returns a list", "Delegates iteration to a sub-generator, forwarding all yields", "Creates a new generator", "Breaks out of a generator"], correctAnswer: 1 }
                ]
            },
            {
                moduleId: 3,
                moduleName: "Module 3: Advanced Python Patterns",
                moduleDescription: "Async programming, concurrency, regular expressions, and functional Python",
                lessons: [
                    {
                        id: 11,
                        title: "Asyncio & Asynchronous Programming",
                        difficulty: "Advanced",
                        estimatedTime: "65 min",
                        keyTerms: ["asyncio", "async/await", "Event Loop", "Coroutine", "Task", "aiohttp"],
                        theory: `
                            <h3 style="color: #f5a623; margin-bottom: 12px;">Concurrency vs Parallelism</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;"><strong>Concurrency:</strong> Multiple tasks make progress (not necessarily simultaneously) — handling many connections at once. <strong>Parallelism:</strong> Tasks run truly simultaneously on multiple cores — CPU-bound computation.</p>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Python's asyncio is <strong>single-threaded concurrency</strong> — ideal for I/O-bound work (network requests, file I/O, DB queries). While awaiting I/O, the event loop runs other coroutines.</p>

                            <div style="background: rgba(245,166,35,0.15); border-left: 4px solid #f5a623; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #f5a623; font-weight: bold; margin-bottom: 8px;">⚡ asyncio vs threading</p>
                                <p style="color: #d1d5db; margin: 0;"><strong>asyncio:</strong> No GIL issues, low overhead, excellent for 1000s of concurrent I/O operations. <strong>threading:</strong> OS threads with GIL — better for blocking C extensions. <strong>multiprocessing:</strong> True parallelism for CPU-bound work.</p>
                            </div>`,
                        codeExample: "import asyncio, aiohttp, time\n\n# Basic coroutine\nasync def fetch_data(url: str, session: aiohttp.ClientSession) -> dict:\n    async with session.get(url) as response:\n        return await response.json()\n\n# Gather: run multiple coroutines concurrently\nasync def fetch_all(urls: list[str]) -> list:\n    async with aiohttp.ClientSession() as session:\n        tasks = [fetch_data(url, session) for url in urls]\n        results = await asyncio.gather(*tasks, return_exceptions=True)\n    return results\n\n# asyncio.create_task: schedule without awaiting immediately\nasync def pipeline():\n    task1 = asyncio.create_task(slow_operation(\"A\"))\n    task2 = asyncio.create_task(slow_operation(\"B\"))\n    # Both run concurrently while we do other work\n    r1 = await task1\n    r2 = await task2\n    return r1, r2\n\nasync def slow_operation(name: str) -> str:\n    print(f\"{name}: started\")\n    await asyncio.sleep(1)   # Non-blocking — yields to event loop\n    print(f\"{name}: done\")\n    return f\"Result-{name}\"\n\n# asyncio.timeout (Python 3.11+)\nasync def with_timeout():\n    try:\n        async with asyncio.timeout(5.0):\n            result = await slow_operation(\"C\")\n    except asyncio.TimeoutError:\n        print(\"Operation timed out\")\n\nasyncio.run(pipeline())",
                        codeExplanation: "asyncio.gather() runs all coroutines concurrently — total time ≈ max(individual times) instead of sum. create_task() schedules immediately without blocking.",
                        bestPractices: [
                            "Use asyncio.gather() for concurrent I/O, not sequential awaits",
                            "Always use async with for async context managers (aiohttp, databases)",
                            "Use asyncio.timeout() (3.11+) instead of asyncio.wait_for for timeouts",
                            "Don't mix sync blocking calls (time.sleep, requests) in async code"
                        ],
                        startingCode: "import asyncio\n\n# TODO: Create async function that simulates 3 API calls concurrently\n# TODO: Use asyncio.gather to run them all at once\n# TODO: Measure time savings vs sequential execution using time.perf_counter\n# TODO: Add a 2-second timeout using asyncio.timeout\n\nasync def fake_api_call(endpoint: str, delay: float) -> str:\n    await asyncio.sleep(delay)\n    return f\"Response from {endpoint}\"\n\nasyncio.run(main())"
                    },
                    {
                        id: 12,
                        title: "Regular Expressions & Text Processing",
                        difficulty: "Intermediate",
                        estimatedTime: "55 min",
                        keyTerms: ["re module", "Pattern", "Group", "Lookahead", "Greedy vs Lazy", "Named Groups"],
                        theory: `
                            <h3 style="color: #f5a623; margin-bottom: 12px;">Regular Expressions: Pattern Matching Engine</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Regex is a mini-language for describing string patterns. Python's <span style="font-family:monospace;">re</span> module compiles patterns into finite automata for efficient matching. Used for validation, extraction, and transformation.</p>

                            <table style="width:100%; border-collapse:collapse; color:#d1d5db; margin-bottom:15px; font-size:13px;">
                                <tr style="background:rgba(245,166,35,0.1);">
                                    <td style="padding:8px; color:#f5a623; font-weight:bold;">Pattern</td>
                                    <td style="padding:8px; color:#f5a623; font-weight:bold;">Meaning</td>
                                    <td style="padding:8px; color:#f5a623; font-weight:bold;">Example Match</td>
                                </tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px; font-family:monospace;">\\d+</td><td style="padding:8px;">One or more digits</td><td style="padding:8px;">"123", "42"</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px; font-family:monospace;">\\w+</td><td style="padding:8px;">Word characters (alnum+_)</td><td style="padding:8px;">"hello_world"</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px; font-family:monospace;">[A-Za-z]</td><td style="padding:8px;">Character class</td><td style="padding:8px;">Any letter</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px; font-family:monospace;">(?P&lt;name&gt;...)</td><td style="padding:8px;">Named group</td><td style="padding:8px;">Access by name</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px; font-family:monospace;">(?=...)</td><td style="padding:8px;">Lookahead (zero-width)</td><td style="padding:8px;">Match before pattern</td></tr>
                                <tr><td style="padding:8px; font-family:monospace;">*?  +?</td><td style="padding:8px;">Lazy quantifiers</td><td style="padding:8px;">Shortest match</td></tr>
                            </table>`,
                        codeExample: "import re\n\n# Compile patterns for reuse (faster)\nEMAIL_PATTERN = re.compile(\n    r'^(?P<user>[a-zA-Z0-9._%+-]+)'\n    r'@(?P<domain>[a-zA-Z0-9.-]+)'\n    r'\\.(?P<tld>[a-zA-Z]{2,})$'\n)\n\ndef validate_email(email: str) -> dict | None:\n    m = EMAIL_PATTERN.match(email)\n    if m:\n        return m.groupdict()  # {'user': ..., 'domain': ..., 'tld': ...}\n    return None\n\nprint(validate_email(\"alice@example.com\"))\n# {'user': 'alice', 'domain': 'example', 'tld': 'com'}\n\n# Extract all dates from text\ntext = \"Meeting on 2024-03-15, deadline 2024-04-01, review 2025-01-20\"\nDATES = re.findall(r'\\d{4}-\\d{2}-\\d{2}', text)\nprint(DATES)  # ['2024-03-15', '2024-04-01', '2025-01-20']\n\n# Substitute: redact credit card numbers\ntext = \"Card: 4532 1234 5678 9010, backup: 3714 496353 98431\"\nredacted = re.sub(r'\\b\\d{4}[- ]?\\d{4}[- ]?\\d{4}[- ]?\\d{3,4}\\b',\n                  '[REDACTED]', text)\nprint(redacted)\n\n# Greedy vs Lazy\nhtml = \"<b>bold</b> and <i>italic</i>\"\nprint(re.findall(r'<.+>',  html))  # Greedy: ['<b>bold</b> and <i>italic</i>']\nprint(re.findall(r'<.+?>', html))  # Lazy:   ['<b>', '</b>', '<i>', '</i>']",
                        codeExplanation: "re.compile() pre-compiles the pattern — use when matching many strings. Named groups ((?P<name>...)) make matches self-documenting. Lazy + vs greedy +? can dramatically change results.",
                        bestPractices: [
                            "Always use raw strings r'...' for regex patterns",
                            "Compile patterns with re.compile() when using repeatedly",
                            "Use named groups for clarity in complex patterns",
                            "Test patterns interactively at regex101.com"
                        ],
                        startingCode: "import re\n\n# TODO: Write a regex to validate Ukrainian phone numbers (+380XXXXXXXXX)\n# TODO: Write a regex to extract all URLs from a block of text\n# TODO: Write a function to mask all digits in a string except last 4\n\ndef validate_ua_phone(phone: str) -> bool:\n    pass\n\ndef extract_urls(text: str) -> list:\n    pass"
                    },
                    {
                        id: 13,
                        title: "Functional Python: map, filter, reduce & itertools",
                        difficulty: "Advanced",
                        estimatedTime: "55 min",
                        keyTerms: ["map()", "filter()", "functools.reduce", "itertools", "partial", "Functional Programming"],
                        theory: `
                            <h3 style="color: #f5a623; margin-bottom: 12px;">Functional Programming in Python</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Python supports functional patterns: <strong>pure functions</strong> (no side effects), <strong>higher-order functions</strong> (functions as arguments/return values), and <strong>immutable data</strong>. These lead to predictable, testable code.</p>

                            <h3 style="color: #f5a623; margin-bottom: 12px;">itertools: The Iteration Toolkit</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">The <span style="font-family:monospace;">itertools</span> module provides memory-efficient building blocks: combinations, permutations, Cartesian products, grouping, and more.</p>

                            <div style="background: rgba(0,213,39,0.15); border-left: 4px solid #00d527; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #00d527; font-weight: bold; margin-bottom: 8px;">🐍 Python Idiom</p>
                                <p style="color: #d1d5db; margin: 0;">In Python, list comprehensions are usually preferred over map/filter for readability. Use map/filter when the function already exists (not a lambda) or in functional pipelines.</p>
                            </div>`,
                        codeExample: "from functools import reduce, partial, lru_cache\nimport itertools, operator\n\n# map & filter — lazy iterators\nnumbers = range(1, 11)\nsquares = list(map(lambda x: x**2, numbers))\nevens   = list(filter(lambda x: x % 2 == 0, numbers))\n\n# reduce: fold a sequence into a single value\nproduct = reduce(operator.mul, range(1, 6))  # 5! = 120\n\n# partial: create specialized functions\nbase_log = partial(print, end=\" | \")  # print with custom end\n\n# lru_cache: memoize pure functions\n@lru_cache(maxsize=None)\ndef fib(n: int) -> int:\n    if n < 2: return n\n    return fib(n-1) + fib(n-2)\n\nprint([fib(i) for i in range(10)])  # Cached — fast!\n\n# itertools showcase\n# combinations: choose 2 from ['A','B','C']\nprint(list(itertools.combinations('ABC', 2)))\n# [('A','B'), ('A','C'), ('B','C')]\n\n# groupby: group sorted data\ndata = [(\"Alice\",\"HR\"), (\"Bob\",\"Eng\"), (\"Carol\",\"HR\"), (\"Dave\",\"Eng\")]\nfor dept, members in itertools.groupby(sorted(data, key=lambda x: x[1]),\n                                        key=lambda x: x[1]):\n    print(f\"{dept}: {[m[0] for m in members]}\")\n\n# chain: flatten nested iterables\nnested = [[1,2],[3,4],[5,6]]\nflat = list(itertools.chain.from_iterable(nested))\nprint(flat)  # [1,2,3,4,5,6]",
                        codeExplanation: "@lru_cache memoizes the function — identical arguments return cached results instantly. itertools.groupby requires sorted input to group correctly.",
                        bestPractices: [
                            "Use @functools.lru_cache for expensive pure functions with repeated inputs",
                            "itertools.chain.from_iterable flattens one level of nesting",
                            "partial() specializes generic functions into specific ones",
                            "operator module provides pre-built functions for +, *, <, etc."
                        ],
                        startingCode: "from functools import reduce, lru_cache\nimport itertools\n\n# TODO: Use lru_cache to memoize a slow recursive function\n# TODO: Use itertools.product to generate all password combinations from a charset\n# TODO: Use reduce to implement your own flatten() for arbitrarily nested lists\n# TODO: Use itertools.islice to take first N items from an infinite generator\n\ncharset = 'abc123'\npassword_length = 3"
                    },
                    {
                        id: 14,
                        title: "Threading, Multiprocessing & the GIL",
                        difficulty: "Advanced",
                        estimatedTime: "60 min",
                        keyTerms: ["GIL", "threading", "multiprocessing", "concurrent.futures", "ProcessPoolExecutor", "Race Condition"],
                        theory: `
                            <h3 style="color: #f5a623; margin-bottom: 12px;">The Global Interpreter Lock (GIL)</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">CPython's <strong>GIL</strong> ensures only one thread executes Python bytecode at a time. This simplifies memory management but limits CPU parallelism for Python code. The GIL is released during I/O and C extension calls.</p>

                            <h3 style="color: #f5a623; margin-bottom: 12px;">When to Use What</h3>
                            <table style="width:100%; border-collapse:collapse; color:#d1d5db; margin-bottom:15px; font-size:13px;">
                                <tr style="background:rgba(245,166,35,0.1);">
                                    <td style="padding:9px; color:#f5a623; font-weight:bold;">Tool</td>
                                    <td style="padding:9px; color:#f5a623; font-weight:bold;">Best For</td>
                                    <td style="padding:9px; color:#f5a623; font-weight:bold;">GIL Impact</td>
                                </tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:9px;">asyncio</td><td style="padding:9px;">I/O-bound, 1000s concurrent</td><td style="padding:9px; color:#00d527;">None</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:9px;">threading</td><td style="padding:9px;">I/O-bound, blocking C calls</td><td style="padding:9px; color:#ffca2c;">Minimal for I/O</td></tr>
                                <tr><td style="padding:9px;">multiprocessing</td><td style="padding:9px;">CPU-bound computation</td><td style="padding:9px; color:#00d527;">Bypasses GIL</td></tr>
                            </table>

                            <div style="background: rgba(255,75,75,0.15); border-left: 4px solid #ff4b4b; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #ff4b4b; font-weight: bold; margin-bottom: 8px;">⚠️ Race Conditions</p>
                                <p style="color: #d1d5db; margin: 0;">Multiple threads accessing shared mutable state can produce race conditions. Use <code>threading.Lock()</code> or <code>threading.RLock()</code> to synchronize. Or avoid shared state entirely with the actor model (message passing).</p>
                            </div>`,
                        codeExample: "from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor\nimport threading, requests, math\n\n# ThreadPoolExecutor: concurrent I/O (downloading)\ndef download(url: str) -> int:\n    r = requests.get(url, timeout=10)\n    return len(r.content)\n\nurls = [\"https://httpbin.org/bytes/1000\"] * 10\n\nwith ThreadPoolExecutor(max_workers=10) as executor:\n    sizes = list(executor.map(download, urls))\nprint(f\"Downloaded {sum(sizes):,} bytes total\")\n\n# ProcessPoolExecutor: parallel CPU computation\ndef is_prime(n: int) -> bool:\n    if n < 2: return False\n    return all(n % i != 0 for i in range(2, int(math.sqrt(n)) + 1))\n\nwith ProcessPoolExecutor() as executor:\n    large_primes = [n for n, p in zip(\n        range(900_000, 901_000),\n        executor.map(is_prime, range(900_000, 901_000))\n    ) if p]\n\n# Thread-safe counter with Lock\nclass SafeCounter:\n    def __init__(self):\n        self._count = 0\n        self._lock = threading.Lock()\n\n    def increment(self) -> None:\n        with self._lock:\n            self._count += 1   # Critical section\n\n    @property\n    def value(self) -> int:\n        with self._lock:\n            return self._count",
                        codeExplanation: "ThreadPoolExecutor.map() returns results in submission order. ProcessPoolExecutor spawns real OS processes — bypasses GIL for CPU work. Lock with 'with' ensures it's always released.",
                        bestPractices: [
                            "Use concurrent.futures as the high-level API for both threads and processes",
                            "Always use Lock/RLock for shared mutable state in threads",
                            "Prefer immutable data or message queues to avoid race conditions",
                            "Python 3.13+ has experimental no-GIL mode (--disable-gil)"
                        ],
                        startingCode: "from concurrent.futures import ProcessPoolExecutor\nimport math\n\n# TODO: Implement parallel prime sieve using ProcessPoolExecutor\n# TODO: Compare performance with sequential version using time.perf_counter\n# TODO: Implement a thread-safe Queue-based producer-consumer pipeline\n\ndef count_primes_in_range(start: int, end: int) -> int:\n    pass"
                    },
                    {
                        id: 15,
                        title: "Testing, Debugging & Code Quality",
                        difficulty: "Advanced",
                        estimatedTime: "60 min",
                        keyTerms: ["pytest", "unittest.mock", "Coverage", "Type Checking", "mypy", "Profiling"],
                        theory: `
                            <h3 style="color: #f5a623; margin-bottom: 12px;">Professional Python Development</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Production Python requires a disciplined toolchain: <strong>pytest</strong> for testing, <strong>mock</strong> for isolation, <strong>mypy</strong> for static type checking, <strong>coverage</strong> for test coverage measurement, and <strong>cProfile</strong> for performance profiling.</p>

                            <h3 style="color: #f5a623; margin-bottom: 12px;">pytest Fixtures & Parametrize</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;"><strong>Fixtures</strong> provide reusable test setup/teardown. <strong>@pytest.mark.parametrize</strong> runs the same test with multiple inputs — eliminates test duplication.</p>

                            <div style="background: rgba(0,213,39,0.15); border-left: 4px solid #00d527; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #00d527; font-weight: bold; margin-bottom: 8px;">🏆 Congratulations: Python Mastery Complete</p>
                                <p style="color: #d1d5db; margin: 0;">You've completed the full Python curriculum. From dynamic typing to async programming, OOP, generators, concurrency, and professional testing — you're ready for data engineering, backend development, automation, and AI/ML engineering roles.</p>
                            </div>`,
                        codeExample: "import pytest\nfrom unittest.mock import patch, MagicMock\n\n# System under test\nclass UserService:\n    def __init__(self, db):\n        self.db = db\n    def get_user(self, user_id: int) -> dict:\n        return self.db.find(user_id)\n    def create_user(self, name: str, email: str) -> dict:\n        if not email or '@' not in email:\n            raise ValueError(\"Invalid email\")\n        return self.db.insert({\"name\": name, \"email\": email})\n\n# Fixture: reusable mock DB\n@pytest.fixture\ndef mock_db():\n    return MagicMock()\n\n@pytest.fixture\ndef service(mock_db):\n    return UserService(mock_db)\n\n# Parametrized test: multiple email scenarios\n@pytest.mark.parametrize(\"email,valid\", [\n    (\"alice@example.com\", True),\n    (\"bob@company.org\",   True),\n    (\"not-an-email\",      False),\n    (\"\",                  False),\n    (\"@nodomain\",         False),\n])\ndef test_email_validation(service, email, valid):\n    if valid:\n        service.db.insert.return_value = {\"id\": 1, \"email\": email}\n        result = service.create_user(\"Test\", email)\n        assert result[\"email\"] == email\n    else:\n        with pytest.raises(ValueError):\n            service.create_user(\"Test\", email)\n\n# Mock external HTTP calls\ndef test_api_call_mocked():\n    with patch('requests.get') as mock_get:\n        mock_get.return_value.json.return_value = {\"status\": \"ok\"}\n        # test code here using requests.get",
                        codeExplanation: "Fixtures are injected by parameter name — pytest resolves them automatically. MagicMock auto-creates attributes and methods. patch() replaces the target only during the test.",
                        bestPractices: [
                            "Test behavior, not implementation — mock external dependencies",
                            "Run coverage: pytest --cov=myapp — aim for >85% on critical paths",
                            "Use mypy --strict for full type checking in production code",
                            "Use cProfile + snakeviz for profiling: python -m cProfile -o out.prof script.py"
                        ],
                        startingCode: "import pytest\n\n# TODO: Write a BankAccount class with deposit, withdraw, and transfer methods\n# TODO: Write pytest tests using fixtures for the account\n# TODO: Parametrize tests for edge cases (negative amounts, overdraft)\n# TODO: Mock an external notification service that sends emails on large transfers\n\nclass BankAccount:\n    pass"
                    }
                ],
                quiz: [
                    { question: "What is asyncio designed for?", options: ["CPU-bound parallel computation", "I/O-bound concurrent operations on a single thread", "Multi-core processing", "GPU acceleration"], correctAnswer: 1 },
                    { question: "What does the GIL prevent in CPython?", options: ["Memory leaks", "Import of external modules", "True parallel execution of Python bytecode across threads", "Async function calls"], correctAnswer: 2 },
                    { question: "Which tool bypasses the GIL for CPU-bound work?", options: ["asyncio", "threading", "multiprocessing", "aiohttp"], correctAnswer: 2 },
                    { question: "What does re.compile() return?", options: ["A matched string", "A compiled pattern object for efficient repeated matching", "A list of matches", "A replacement string"], correctAnswer: 1 },
                    { question: "What is @functools.lru_cache?", options: ["A decorator that logs function calls", "A decorator that caches results of pure function calls by arguments", "A context manager for memory", "A thread lock decorator"], correctAnswer: 1 },
                    { question: "What does asyncio.gather() do?", options: ["Creates a new event loop", "Runs multiple coroutines concurrently and collects results", "Cancels running tasks", "Blocks until all threads finish"], correctAnswer: 1 },
                    { question: "What is a Race Condition?", options: ["A performance benchmark", "Two threads accessing shared mutable state with unpredictable results", "A type of algorithm", "A network timeout"], correctAnswer: 1 },
                    { question: "What does pytest @parametrize do?", options: ["Runs a test in parallel", "Runs the same test function with multiple sets of arguments", "Skips a test conditionally", "Mocks function parameters"], correctAnswer: 1 },
                    { question: "What does the lazy quantifier *? match?", options: ["Maximum possible characters", "Minimum possible characters", "Only whitespace", "Digits only"], correctAnswer: 1 },
                    { question: "What does itertools.groupby require as input?", options: ["A dictionary", "An unsorted list", "A sorted iterable (groups consecutive identical keys)", "A generator"], correctAnswer: 2 }
                ]
            },
            {
                moduleId: 4,
                moduleName: "Module 4: Python for Data & Automation",
                moduleDescription: "Data analysis, web automation, API development, and deployment",
                lessons: [
                    {
                        id: 16,
                        title: "Data Analysis with pandas & numpy",
                        difficulty: "Advanced",
                        estimatedTime: "70 min",
                        keyTerms: ["DataFrame", "ndarray", "Vectorization", "Broadcasting", "groupby", "merge"],
                        theory: `
                            <h3 style="color: #f5a623; margin-bottom: 12px;">numpy: Vectorized Computation</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">numpy's <span style="font-family:monospace;">ndarray</span> stores elements in contiguous C memory. Operations are dispatched to optimized BLAS/LAPACK routines — 10–100× faster than Python loops. <strong>Vectorize everything.</strong></p>
                            <h3 style="color: #f5a623; margin-bottom: 12px;">pandas: Structured Data</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">DataFrame is a 2D table with labeled axes. Built on numpy, it adds missing value handling, powerful aggregation, time series, and SQL-like operations.</p>`,
                        codeExample: "import numpy as np\nimport pandas as pd\n\n# numpy vectorized ops — no Python loops\na = np.arange(1_000_000)\nb = np.random.randn(1_000_000)\nresult = a * b + np.sin(a)  # All in C, near-instant\n\n# Broadcasting: scalar ops apply element-wise\nmatrix = np.ones((3, 4))\nmatrix *= 5               # All 12 elements become 5\nnorm = (matrix - matrix.mean()) / matrix.std()\n\n# pandas DataFrame\ndf = pd.DataFrame({\n    'name':   ['Alice', 'Bob', 'Carol', 'Dave'],\n    'dept':   ['Eng', 'HR', 'Eng', 'HR'],\n    'salary': [95000, 72000, 88000, 68000],\n    'years':  [5, 3, 7, 2]\n})\n\n# Aggregation\nprint(df.groupby('dept')['salary'].agg(['mean', 'max', 'count']))\n\n# Boolean indexing\nhigh_earners = df[df['salary'] > 80_000].sort_values('salary', ascending=False)\n\n# Apply + lambda\ndf['bonus'] = df['salary'].apply(lambda s: s * 0.15 if s > 80_000 else s * 0.10)\n\n# merge (SQL JOIN)\nreviews = pd.DataFrame({'name': ['Alice','Bob'], 'rating': [4.8, 3.9]})\nmerged = df.merge(reviews, on='name', how='left')\nprint(merged[['name','salary','rating']])",
                        codeExplanation: "Boolean indexing (df[mask]) is vectorized — no Python loop. groupby creates a split-apply-combine pipeline entirely in C. merge performs SQL-style joins.",
                        bestPractices: [
                            "Never iterate rows with for loops — use vectorized operations or apply()",
                            "Use df.query() for readable complex filters",
                            "Specify dtypes on load: pd.read_csv(..., dtype={'id': int}) for performance",
                            "Use .copy() when modifying a DataFrame slice to avoid SettingWithCopyWarning"
                        ],
                        startingCode: "import pandas as pd\nimport numpy as np\n\n# TODO: Load sales data (simulate with random DataFrame)\n# TODO: Find top 5 products by total revenue\n# TODO: Calculate month-over-month growth rate\n# TODO: Identify any products with declining 3-month trend\n\nnp.random.seed(42)\ndf = pd.DataFrame({\n    'product': np.random.choice(['A','B','C','D','E'], 100),\n    'month': np.random.choice(range(1, 13), 100),\n    'revenue': np.random.randint(1000, 50000, 100)\n})"
                    },
                    {
                        id: 17,
                        title: "Web Scraping & API Integration",
                        difficulty: "Advanced",
                        estimatedTime: "65 min",
                        keyTerms: ["requests", "BeautifulSoup", "Selenium", "REST API", "Rate Limiting", "robots.txt"],
                        theory: `
                            <h3 style="color: #f5a623; margin-bottom: 12px;">Ethical Web Scraping</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Always check <strong>robots.txt</strong>, honor rate limits, identify your bot in User-Agent headers, and prefer official APIs when available. Aggressive scraping can cause denial of service.</p>
                            <div style="background: rgba(245,166,35,0.15); border-left: 4px solid #f5a623; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #f5a623; font-weight: bold; margin-bottom: 8px;">🔧 Tool Selection</p>
                                <p style="color: #d1d5db; margin: 0;"><strong>requests + BS4:</strong> Static HTML pages. <strong>Playwright/Selenium:</strong> JavaScript-rendered pages. <strong>httpx:</strong> Async requests. <strong>Scrapy:</strong> Large-scale crawling framework.</p>
                            </div>`,
                        codeExample: "import requests, time\nfrom bs4 import BeautifulSoup\nfrom urllib.robotparser import RobotFileParser\n\n# Check robots.txt first\ndef can_fetch(url: str, agent: str = \"*\") -> bool:\n    from urllib.parse import urlparse\n    parsed = urlparse(url)\n    rp = RobotFileParser(f\"{parsed.scheme}://{parsed.netloc}/robots.txt\")\n    rp.read()\n    return rp.can_fetch(agent, url)\n\n# Scraper with retry & rate limiting\nclass Scraper:\n    def __init__(self, delay: float = 1.5):\n        self.session = requests.Session()\n        self.session.headers[\"User-Agent\"] = \"ResearchBot/1.0 (educational)\"\n        self.delay = delay\n\n    def get(self, url: str, retries: int = 3) -> str:\n        for attempt in range(retries):\n            try:\n                r = self.session.get(url, timeout=10)\n                r.raise_for_status()\n                time.sleep(self.delay)  # Rate limiting\n                return r.text\n            except requests.RequestException as e:\n                if attempt == retries - 1: raise\n                time.sleep(2 ** attempt)  # Exponential backoff\n\n    def parse_links(self, html: str, base: str) -> list:\n        soup = BeautifulSoup(html, 'lxml')\n        return [a['href'] for a in soup.find_all('a', href=True)\n                if a['href'].startswith('http')]\n\n# REST API client with auth\ndef github_api(endpoint: str, token: str) -> dict:\n    r = requests.get(\n        f\"https://api.github.com{endpoint}\",\n        headers={\"Authorization\": f\"Bearer {token}\",\n                 \"Accept\": \"application/vnd.github.v3+json\"},\n        timeout=10\n    )\n    r.raise_for_status()  # Raise on 4xx/5xx\n    return r.json()",
                        codeExplanation: "Session reuses TCP connections — much faster for many requests to the same host. Exponential backoff prevents hammering failing servers.",
                        bestPractices: [
                            "Use sessions for multiple requests to the same host",
                            "Always implement exponential backoff on retry",
                            "Parse HTML with lxml parser (faster than html.parser)",
                            "Store scraped data incrementally — don't hold everything in RAM"
                        ],
                        startingCode: "import requests\nfrom bs4 import BeautifulSoup\n\n# TODO: Create a function that fetches HN front page and returns top 10 titles+URLs\n# TODO: Add retry logic with exponential backoff\n# TODO: Rate limit to max 1 request/second\n# TODO: Save results to a JSON file\n\ndef scrape_hackernews() -> list:\n    pass"
                    },
                    {
                        id: 18,
                        title: "Building REST APIs with FastAPI",
                        difficulty: "Advanced",
                        estimatedTime: "65 min",
                        keyTerms: ["FastAPI", "Pydantic", "ASGI", "Dependency Injection", "OpenAPI", "JWT Authentication"],
                        theory: `
                            <h3 style="color: #f5a623; margin-bottom: 12px;">FastAPI: Modern Python APIs</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">FastAPI is built on <strong>Starlette</strong> (ASGI) and <strong>Pydantic</strong> (validation). It auto-generates OpenAPI docs, validates request/response schemas, and handles async natively. Comparable performance to Node.js and Go.</p>
                            <h3 style="color: #f5a623; margin-bottom: 12px;">Pydantic: Runtime Type Validation</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Pydantic models validate data at runtime using type annotations. Invalid data raises clear validation errors with field-level details — not cryptic stack traces.</p>`,
                        codeExample: "from fastapi import FastAPI, HTTPException, Depends, status\nfrom pydantic import BaseModel, EmailStr, Field\nfrom typing import Annotated\nimport uvicorn\n\napp = FastAPI(title=\"User API\", version=\"1.0.0\")\n\n# Pydantic schemas\nclass UserCreate(BaseModel):\n    name: str = Field(..., min_length=2, max_length=50)\n    email: EmailStr\n    age: int = Field(..., ge=18, le=120)\n\nclass UserResponse(BaseModel):\n    id: int\n    name: str\n    email: EmailStr\n\n# In-memory DB simulation\ndb: dict[int, dict] = {}\nnext_id = 1\n\n# Dependency\ndef get_db():\n    return db\n\n@app.post(\"/users\", response_model=UserResponse, status_code=status.HTTP_201_CREATED)\nasync def create_user(user: UserCreate, database = Depends(get_db)):\n    global next_id\n    record = {\"id\": next_id, **user.model_dump()}\n    database[next_id] = record\n    next_id += 1\n    return record\n\n@app.get(\"/users/{user_id}\", response_model=UserResponse)\nasync def get_user(user_id: int, database = Depends(get_db)):\n    if user_id not in database:\n        raise HTTPException(status_code=404, detail=f\"User {user_id} not found\")\n    return database[user_id]\n\n@app.get(\"/users\", response_model=list[UserResponse])\nasync def list_users(skip: int = 0, limit: int = 10, database = Depends(get_db)):\n    users = list(database.values())\n    return users[skip:skip+limit]\n\n# Run: uvicorn api:app --reload\n# Docs: http://localhost:8000/docs",
                        codeExplanation: "Pydantic validators run automatically — FastAPI rejects invalid payloads with 422 Unprocessable Entity. Depends() implements dependency injection for DB connections, auth, etc.",
                        bestPractices: [
                            "Separate input schemas (UserCreate) from output schemas (UserResponse)",
                            "Use Depends() for all shared resources: DB sessions, auth verification",
                            "Always set response_model — prevents leaking sensitive fields",
                            "Use alembic for database migrations with SQLAlchemy"
                        ],
                        startingCode: "from fastapi import FastAPI, HTTPException\nfrom pydantic import BaseModel, Field\n\napp = FastAPI()\n\n# TODO: Create a Task management API with:\n# TODO: POST /tasks - create task with title, description, priority (1-5)\n# TODO: GET /tasks - list all tasks with optional ?status= filter\n# TODO: PATCH /tasks/{id} - update task status (todo/in-progress/done)\n# TODO: DELETE /tasks/{id} - delete task\n\nclass Task(BaseModel):\n    pass"
                    },
                    {
                        id: 19,
                        title: "Machine Learning Foundations with scikit-learn",
                        difficulty: "Advanced",
                        estimatedTime: "70 min",
                        keyTerms: ["scikit-learn", "Train/Test Split", "Cross-Validation", "Feature Engineering", "Pipeline", "Overfitting"],
                        theory: `
                            <h3 style="color: #f5a623; margin-bottom: 12px;">The ML Workflow</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Every ML project follows: <strong>Data → Feature Engineering → Model Selection → Training → Evaluation → Deployment</strong>. scikit-learn provides consistent APIs across algorithms.</p>
                            <div style="background: rgba(255,75,75,0.15); border-left: 4px solid #ff4b4b; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #ff4b4b; font-weight: bold; margin-bottom: 8px;">⚠️ Overfitting & Data Leakage</p>
                                <p style="color: #d1d5db; margin: 0;"><strong>Overfitting:</strong> Model memorizes training data, fails on new data. Use cross-validation and regularization. <strong>Data Leakage:</strong> Test data influences training — gives falsely optimistic metrics. Always split BEFORE preprocessing.</p>
                            </div>`,
                        codeExample: "from sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler, LabelEncoder\nfrom sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier\nfrom sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV\nfrom sklearn.metrics import classification_report, confusion_matrix\nimport numpy as np\n\n# Generate synthetic dataset\nnp.random.seed(42)\nX = np.random.randn(1000, 10)\ny = (X[:, 0] + X[:, 2] * 2 > 1).astype(int)  # Label based on features\n\n# CRITICAL: Split BEFORE any preprocessing\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42, stratify=y\n)\n\n# Pipeline: prevents data leakage from preprocessing\npipeline = Pipeline([\n    ('scaler', StandardScaler()),         # Fit only on train\n    ('classifier', RandomForestClassifier(n_estimators=100, random_state=42))\n])\n\n# Cross-validation: more reliable than single train/test split\ncv_scores = cross_val_score(pipeline, X_train, y_train, cv=5, scoring='f1')\nprint(f\"CV F1: {cv_scores.mean():.3f} ± {cv_scores.std():.3f}\")\n\n# Train and evaluate\npipeline.fit(X_train, y_train)\ny_pred = pipeline.predict(X_test)\nprint(classification_report(y_test, y_pred))\n\n# Hyperparameter tuning\nparam_grid = {'classifier__n_estimators': [50, 100, 200],\n              'classifier__max_depth': [None, 5, 10]}\ngrid = GridSearchCV(pipeline, param_grid, cv=3, n_jobs=-1)\ngrid.fit(X_train, y_train)\nprint(\"Best params:\", grid.best_params_)",
                        codeExplanation: "Pipeline ensures scaler.fit() only sees training data — prevents leakage. GridSearchCV exhaustively tries all parameter combinations with cross-validation. n_jobs=-1 uses all CPU cores.",
                        bestPractices: [
                            "Always use Pipeline to prevent data leakage from preprocessing",
                            "Use stratify=y in train_test_split for imbalanced classes",
                            "Report F1/AUC, not just accuracy — accuracy misleads on imbalanced data",
                            "Use SHAP values to interpret complex models (tree SHAP is fast)"
                        ],
                        startingCode: "from sklearn.datasets import load_breast_cancer\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.svm import SVC\nfrom sklearn.model_selection import cross_val_score\n\n# TODO: Load breast cancer dataset\n# TODO: Build Pipeline with StandardScaler + SVC\n# TODO: Evaluate with 10-fold cross-validation\n# TODO: Use GridSearchCV to optimize SVC kernel and C parameter\n# TODO: Print final classification report\n\ndata = load_breast_cancer()"
                    },
                    {
                        id: 20,
                        title: "Python Packaging, CI/CD & Production Deployment",
                        difficulty: "Advanced",
                        estimatedTime: "65 min",
                        keyTerms: ["pyproject.toml", "Docker", "GitHub Actions", "uv", "Pre-commit", "Logging"],
                        theory: `
                            <h3 style="color: #f5a623; margin-bottom: 12px;">Modern Python Project Structure</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Production Python uses <span style="font-family:monospace;">pyproject.toml</span> (PEP 517/518) for packaging, <strong>uv</strong> for ultra-fast dependency management, <strong>pre-commit</strong> hooks for code quality, and <strong>Docker</strong> for reproducible deployments.</p>

                            <h3 style="color: #f5a623; margin-bottom: 12px;">Structured Logging</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Never use print() in production. The <span style="font-family:monospace;">logging</span> module provides levels (DEBUG/INFO/WARNING/ERROR/CRITICAL), handlers (file, stream, rotating), and structured output for log aggregation.</p>

                            <div style="background: rgba(0,213,39,0.15); border-left: 4px solid #00d527; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #00d527; font-weight: bold; margin-bottom: 8px;">🏆 Full Python Mastery Achieved</p>
                                <p style="color: #d1d5db; line-height: 1.6; margin: 0;">From fundamentals to production deployment — dynamic typing, OOP, async, data analysis, ML, APIs, and DevOps. You're equipped for senior Python engineering roles across every domain.</p>
                            </div>`,
                        codeExample: "# pyproject.toml (modern Python project config)\n# [project]\n# name = \"my-app\"\n# version = \"1.0.0\"\n# requires-python = \">=3.11\"\n# dependencies = [\"fastapi>=0.100\", \"pydantic>=2.0\"]\n\n# Dockerfile\n# FROM python:3.12-slim\n# WORKDIR /app\n# COPY pyproject.toml .\n# RUN pip install uv && uv pip install -e .[prod]\n# COPY src/ src/\n# CMD [\"uvicorn\", \"src.main:app\", \"--host\", \"0.0.0.0\", \"--port\", \"8000\"]\n\nimport logging, sys\nfrom functools import wraps\n\n# Structured logging setup\ndef setup_logging(level=logging.INFO):\n    logging.basicConfig(\n        level=level,\n        format='%(asctime)s | %(levelname)-8s | %(name)s | %(message)s',\n        handlers=[\n            logging.StreamHandler(sys.stdout),\n            logging.FileHandler('app.log', encoding='utf-8')\n        ]\n    )\n\nlogger = logging.getLogger(__name__)\n\ndef log_calls(func):\n    \"\"\"Decorator that logs function entry, exit, and exceptions.\"\"\"\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        logger.debug(f\"Calling {func.__name__}\")\n        try:\n            result = func(*args, **kwargs)\n            logger.debug(f\"{func.__name__} returned {result!r}\")\n            return result\n        except Exception as e:\n            logger.exception(f\"{func.__name__} raised {type(e).__name__}: {e}\")\n            raise\n    return wrapper\n\n@log_calls\ndef process_payment(amount: float, currency: str = \"USD\") -> bool:\n    if amount <= 0:\n        raise ValueError(f\"Invalid amount: {amount}\")\n    logger.info(f\"Processing {currency} {amount:.2f}\")\n    return True",
                        codeExplanation: "logger.exception() logs the full traceback automatically. The @log_calls decorator applies uniform logging to any function without duplicating code.",
                        bestPractices: [
                            "Use uv or poetry for deterministic dependency resolution",
                            "Multi-stage Docker builds: build stage + slim runtime stage",
                            "Set up pre-commit hooks: black, ruff, mypy run on every commit",
                            "Use GitHub Actions for CI: test → lint → type-check → docker build → deploy"
                        ],
                        startingCode: "import logging\n\n# TODO: Set up a logger with both console and rotating file handler\n# TODO: Create a @retry(max_attempts=3, delay=1.0) decorator with logging\n# TODO: Create a config class using dataclasses that reads from env variables\n# TODO: Write a health_check() function that logs system status (memory, CPU)\n\nfrom logging.handlers import RotatingFileHandler\n\ndef setup_logger(name: str) -> logging.Logger:\n    pass"
                    }
                ],
                quiz: [
                    { question: "What is the primary advantage of numpy over Python lists for computation?", options: ["Dynamic typing", "Vectorized C operations — 10-100x faster than Python loops", "Easier syntax", "Automatic parallelism"], correctAnswer: 1 },
                    { question: "Why must you split data BEFORE preprocessing in ML?", options: ["To save memory", "To prevent data leakage — test data must not influence the model", "Preprocessing changes the shape", "scikit-learn requires it"], correctAnswer: 1 },
                    { question: "What does FastAPI automatically generate from your code?", options: ["Unit tests", "OpenAPI / Swagger documentation", "Docker files", "Database schemas"], correctAnswer: 1 },
                    { question: "What is overfitting in machine learning?", options: ["Model is too slow", "Model memorizes training data and generalizes poorly to new data", "Model has too many features", "Training loss is too high"], correctAnswer: 1 },
                    { question: "What is the purpose of sklearn Pipeline?", options: ["Speed up training", "Prevent data leakage by fitting preprocessors only on training data", "Visualize model performance", "Enable GPU training"], correctAnswer: 1 },
                    { question: "What does robots.txt define for web scrapers?", options: ["The site's CSS rules", "Which pages a bot is allowed or forbidden to access", "The API endpoints", "Cookie policies"], correctAnswer: 1 },
                    { question: "What does requests.Session() provide over single requests.get() calls?", options: ["Async support", "Automatic retries", "TCP connection reuse — much faster for many requests to same host", "JSON auto-parsing"], correctAnswer: 2 },
                    { question: "What logging level should production errors use?", options: ["DEBUG", "INFO", "WARNING", "ERROR or CRITICAL"], correctAnswer: 3 },
                    { question: "What does Pydantic do in a FastAPI application?", options: ["Manages DB connections", "Validates request and response data using type annotations", "Handles authentication", "Routes HTTP requests"], correctAnswer: 1 },
                    { question: "What is pyproject.toml?", options: ["A Python bytecode file", "The modern standard for Python project metadata and packaging configuration", "A Docker configuration file", "A test runner config"], correctAnswer: 1 }
                ]
            }
        ]
    },


    /* ═══════════════════════════════════════════════════════════════════
       CYBERSECURITY COURSE
    ═══════════════════════════════════════════════════════════════════ */
    "cybersecurity": {
        id: "cybersecurity",
        title: "Cybersecurity: Offense, Defense & Cryptography",
        description: "Master ethical hacking, web security, cryptography, network defense, and penetration testing methodologies",
        totalLessons: 20,
        difficulty: "Advanced",
        prerequisites: ["Basic networking knowledge", "Some programming experience", "Linux fundamentals"],
        modules: [
            {
                moduleId: 1,
                moduleName: "Module 1: Foundations & Reconnaissance",
                moduleDescription: "Networking fundamentals, threat modeling, OSINT, and legal ethical hacking framework",
                lessons: [
                    {
                        id: 1,
                        title: "Security Fundamentals & the CIA Triad",
                        difficulty: "Beginner",
                        estimatedTime: "45 min",
                        keyTerms: ["CIA Triad", "Threat Actor", "Attack Surface", "Defense in Depth", "Zero Trust", "CVE"],
                        theory: `
                            <h3 style="color: #e84040; margin-bottom: 12px;">The CIA Triad</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">The foundation of all security decisions — every control, vulnerability, and attack maps to one or more of these three properties:</p>
                            <ul style="margin-bottom: 15px; color: #d1d5db; padding-left: 20px; list-style-type: disc;">
                                <li style="margin-bottom: 8px;"><strong style="color:#e84040;">Confidentiality</strong> — Information accessible only to authorized parties. Encryption, access control, data classification.</li>
                                <li style="margin-bottom: 8px;"><strong style="color:#e84040;">Integrity</strong> — Data has not been tampered with. Checksums, digital signatures, audit logs.</li>
                                <li style="margin-bottom: 8px;"><strong style="color:#e84040;">Availability</strong> — Systems accessible when needed. Redundancy, DDoS mitigation, backups.</li>
                            </ul>

                            <h3 style="color: #e84040; margin-bottom: 12px;">Threat Actor Taxonomy</h3>
                            <table style="width:100%; border-collapse:collapse; color:#d1d5db; margin-bottom:15px; font-size:13px;">
                                <tr style="background:rgba(232,64,64,0.1);">
                                    <td style="padding:9px; color:#e84040; font-weight:bold;">Actor</td>
                                    <td style="padding:9px; color:#e84040; font-weight:bold;">Motivation</td>
                                    <td style="padding:9px; color:#e84040; font-weight:bold;">Sophistication</td>
                                </tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:9px;">Nation-State APT</td><td style="padding:9px;">Espionage, sabotage</td><td style="padding:9px; color:#ff4b4b;">Extreme</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:9px;">Cybercriminal</td><td style="padding:9px;">Financial gain</td><td style="padding:9px; color:#ffca2c;">High</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:9px;">Hacktivist</td><td style="padding:9px;">Ideology</td><td style="padding:9px; color:#ffca2c;">Medium</td></tr>
                                <tr><td style="padding:9px;">Script Kiddie</td><td style="padding:9px;">Recognition</td><td style="padding:9px; color:#00d527;">Low</td></tr>
                            </table>

                            <div style="background: rgba(232,64,64,0.15); border-left: 4px solid #e84040; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #e84040; font-weight: bold; margin-bottom: 8px;">⚖️ Legal Framework — Always First</p>
                                <p style="color: #d1d5db; margin: 0;">All techniques in this course are for <strong>authorized testing only</strong>. Unauthorized access to computer systems is illegal under CFAA (US), Computer Misuse Act (UK), and equivalent laws globally. Always obtain written permission before testing.</p>
                            </div>`,
                        codeExample: "# Attack Surface Mapping (conceptual)\nimport socket\n\ndef check_port(host: str, port: int, timeout: float = 1.0) -> bool:\n    \"\"\"Check if a port is open. Use only on authorized systems.\"\"\"\n    try:\n        with socket.create_connection((host, port), timeout=timeout):\n            return True\n    except (socket.timeout, ConnectionRefusedError, OSError):\n        return False\n\n# CVE severity scoring (CVSS v3)\ndef cvss_severity(score: float) -> str:\n    if score == 0.0: return \"None\"\n    elif score < 4.0: return \"Low\"\n    elif score < 7.0: return \"Medium\"\n    elif score < 9.0: return \"High\"\n    else: return \"Critical\"\n\n# Example: CVE-2021-44228 (Log4Shell) scored 10.0\nprint(cvss_severity(10.0))  # Critical",
                        codeExplanation: "CVSS (Common Vulnerability Scoring System) v3 rates vulnerabilities 0.0–10.0. Score factors include attack vector, complexity, privileges required, and impact scope.",
                        bestPractices: [
                            "Always obtain written authorization (scope of work, rules of engagement)",
                            "Understand CVSS scoring for prioritizing vulnerability remediation",
                            "Follow responsible disclosure — report vulnerabilities to vendors",
                            "Keep a chain of custody for penetration testing evidence"
                        ],
                        startingCode: "# TODO: Write a function that takes a CVSSv3 vector string and returns severity\n# Format: AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H\n# TODO: Implement attack surface calculator that sums open ports\n# TODO: Build a simple asset inventory class\n\ndef parse_cvss_vector(vector: str) -> dict:\n    pass"
                    },
                    {
                        id: 2,
                        title: "Network Fundamentals: TCP/IP Deep Dive",
                        difficulty: "Intermediate",
                        estimatedTime: "55 min",
                        keyTerms: ["TCP Handshake", "OSI Model", "IP Fragmentation", "ARP", "DNS", "Packet Analysis"],
                        theory: `
                            <h3 style="color: #e84040; margin-bottom: 12px;">The OSI Model & Attack Mapping</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Each OSI layer is a distinct attack surface. Understanding which attacks target which layers guides defense architecture.</p>
                            <table style="width:100%; border-collapse:collapse; color:#d1d5db; margin-bottom:15px; font-size:12px;">
                                <tr style="background:rgba(232,64,64,0.1);">
                                    <td style="padding:8px; color:#e84040; font-weight:bold;">Layer</td>
                                    <td style="padding:8px; color:#e84040; font-weight:bold;">Protocol</td>
                                    <td style="padding:8px; color:#e84040; font-weight:bold;">Common Attacks</td>
                                </tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px;">7 Application</td><td style="padding:8px;">HTTP, DNS, SMTP</td><td style="padding:8px;">SQLi, XSS, XXE, SSRF</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px;">6 Presentation</td><td style="padding:8px;">TLS, SSL</td><td style="padding:8px;">BEAST, POODLE, Heartbleed</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px;">4 Transport</td><td style="padding:8px;">TCP, UDP</td><td style="padding:8px;">SYN Flood, Port Scan</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px;">3 Network</td><td style="padding:8px;">IP, ICMP</td><td style="padding:8px;">IP Spoofing, Smurf DDoS</td></tr>
                                <tr><td style="padding:8px;">2 Data Link</td><td style="padding:8px;">Ethernet, ARP</td><td style="padding:8px;">ARP Poisoning, MAC Flood</td></tr>
                            </table>

                            <h3 style="color: #e84040; margin-bottom: 12px;">TCP 3-Way Handshake</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; font-family: monospace; background: rgba(255,255,255,0.05); padding: 10px; border-radius: 4px; line-height: 1.8;">
                                Client → Server: SYN (seq=100)<br/>
                                Server → Client: SYN-ACK (seq=200, ack=101)<br/>
                                Client → Server: ACK (ack=201)<br/>
                                ─── Connection Established ───<br/>
                                SYN Flood: Client sends millions of SYNs, never completes ACK → exhausts server state table
                            </p>`,
                        codeExample: "import struct, socket\n\n# Parse raw IP header (educational — requires root)\ndef parse_ip_header(data: bytes) -> dict:\n    \"\"\"Parse first 20 bytes of IP header.\"\"\"\n    if len(data) < 20:\n        raise ValueError(\"Insufficient data for IP header\")\n    fields = struct.unpack('!BBHHHBBH4s4s', data[:20])\n    return {\n        'version':      fields[0] >> 4,\n        'ihl':          fields[0] & 0xF,\n        'ttl':          fields[6],\n        'protocol':     fields[7],  # 6=TCP, 17=UDP, 1=ICMP\n        'src_ip':       socket.inet_ntoa(fields[9]),\n        'dst_ip':       socket.inet_ntoa(fields[8])\n    }\n\n# DNS lookup analysis\nimport dns.resolver  # dnspython library\n\ndef enumerate_dns(domain: str) -> dict:\n    \"\"\"Enumerate DNS records for authorized domain.\"\"\"\n    results = {}\n    for record_type in ['A', 'MX', 'NS', 'TXT', 'CNAME']:\n        try:\n            answers = dns.resolver.resolve(domain, record_type)\n            results[record_type] = [str(r) for r in answers]\n        except Exception:\n            pass\n    return results",
                        codeExplanation: "struct.unpack('!BBHHHBBH4s4s') parses binary data: ! = network byte order (big-endian), B = unsigned byte, H = unsigned short, 4s = 4-char string.",
                        bestPractices: [
                            "Use Wireshark or tcpdump for real packet analysis",
                            "Understand ARP cache — ARP poisoning bypasses all higher-layer security",
                            "DNS enumeration reveals infrastructure — check CAA records for cert issuance",
                            "Always use encrypted channels (TLS 1.3) to prevent packet capture attacks"
                        ],
                        startingCode: "import socket\n\n# TODO: Build a port scanner that identifies service banners\n# TODO: Implement TCP connect scan (full handshake) for accuracy\n# TODO: Add service fingerprinting for common ports (80, 443, 22, 3306)\n# TODO: Only scan 127.0.0.1 or explicitly authorized targets\n\ndef port_scanner(host: str, ports: list[int]) -> dict:\n    pass"
                    },
                    {
                        id: 3,
                        title: "OSINT & Reconnaissance Techniques",
                        difficulty: "Intermediate",
                        estimatedTime: "55 min",
                        keyTerms: ["OSINT", "Passive Reconnaissance", "Shodan", "Google Dorks", "WHOIS", "Maltego"],
                        theory: `
                            <h3 style="color: #e84040; margin-bottom: 12px;">Passive vs Active Reconnaissance</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;"><strong style="color:#00d527;">Passive Recon:</strong> Gather information without touching the target — public records, search engines, social media. Leaves no trace on target systems. <strong style="color:#ff4b4b;">Active Recon:</strong> Direct interaction with target (port scanning, banner grabbing). Detectable, requires authorization.</p>

                            <h3 style="color: #e84040; margin-bottom: 12px;">Google Dork Operators</h3>
                            <table style="width:100%; border-collapse:collapse; color:#d1d5db; margin-bottom:15px; font-size:13px;">
                                <tr style="background:rgba(232,64,64,0.1);"><td style="padding:8px; color:#e84040; font-weight:bold;">Dork</td><td style="padding:8px; color:#e84040; font-weight:bold;">Purpose</td><td style="padding:8px; color:#e84040; font-weight:bold;">Example</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px; font-family:monospace;">site:</td><td style="padding:8px;">Limit to domain</td><td style="padding:8px; font-family:monospace;">site:target.com</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px; font-family:monospace;">filetype:</td><td style="padding:8px;">Find file types</td><td style="padding:8px; font-family:monospace;">filetype:pdf site:target.com</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px; font-family:monospace;">inurl:</td><td style="padding:8px;">URL contains string</td><td style="padding:8px; font-family:monospace;">inurl:admin</td></tr>
                                <tr><td style="padding:8px; font-family:monospace;">intitle:</td><td style="padding:8px;">Page title match</td><td style="padding:8px; font-family:monospace;">intitle:"index of"</td></tr>
                            </table>

                            <div style="background: rgba(232,64,64,0.15); border-left: 4px solid #e84040; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #e84040; font-weight: bold; margin-bottom: 8px;">🔍 OSINT Mindset</p>
                                <p style="color: #d1d5db; margin: 0;">Attackers spend 70% of their time on reconnaissance. The more you know about a target before attacking, the more precise and effective the engagement. Modern OSINT tools: <strong>theHarvester, Maltego, Recon-ng, Shodan, Censys.</strong></p>
                            </div>`,
                        codeExample: "import requests, re\nfrom urllib.parse import urljoin\n\nclass OsintCollector:\n    \"\"\"Passive OSINT — no target interaction except public data.\"\"\"\n\n    @staticmethod\n    def whois_lookup(domain: str) -> dict:\n        \"\"\"Public WHOIS data: registrar, dates, contacts.\"\"\"\n        r = requests.get(f\"https://api.whois.vu/?q={domain}\", timeout=10)\n        return r.json()\n\n    @staticmethod\n    def shodan_host(ip: str, api_key: str) -> dict:\n        \"\"\"Retrieve Shodan data on a host (requires API key).\"\"\"\n        r = requests.get(\n            f\"https://api.shodan.io/shodan/host/{ip}\",\n            params={\"key\": api_key}, timeout=10\n        )\n        if r.status_code == 200:\n            data = r.json()\n            return {\n                \"ports\":   data.get(\"ports\", []),\n                \"vulns\":   list(data.get(\"vulns\", {}).keys()),\n                \"hostnames\": data.get(\"hostnames\", []),\n                \"org\":     data.get(\"org\", \"Unknown\")\n            }\n        return {}\n\n    @staticmethod\n    def extract_emails(text: str) -> list:\n        \"\"\"Extract email addresses from public content.\"\"\"\n        pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}'\n        return list(set(re.findall(pattern, text)))\n\n    @staticmethod\n    def find_subdomains(domain: str) -> list:\n        \"\"\"Certificate Transparency logs — no target interaction.\"\"\"\n        r = requests.get(\n            f\"https://crt.sh/?q=%.{domain}&output=json\", timeout=15\n        )\n        if r.status_code == 200:\n            entries = r.json()\n            subs = {e['name_value'].lstrip('*.') for e in entries}\n            return sorted(subs)\n        return []",
                        codeExplanation: "Certificate Transparency (crt.sh) logs all issued TLS certificates publicly — reveals subdomains without touching the target. Shodan indexes internet-facing services continuously.",
                        bestPractices: [
                            "Always verify you have authorization before active reconnaissance",
                            "Document all OSINT findings with timestamps and sources",
                            "Check Have I Been Pwned API for credential exposure of target domain",
                            "Use VPN/Tor for anonymization only in authorized engagements"
                        ],
                        startingCode: "import requests\n\n# TODO: Build an OSINT aggregator for a domain you OWN\n# TODO: Query crt.sh for subdomains\n# TODO: Resolve each subdomain to IPs\n# TODO: Check each IP against AbuseIPDB\n# TODO: Generate a report summarizing the findings\n\ndef osint_report(domain: str) -> dict:\n    pass"
                    },
                    {
                        id: 4,
                        title: "Linux for Security: Command Line Mastery",
                        difficulty: "Intermediate",
                        estimatedTime: "60 min",
                        keyTerms: ["File Permissions", "setuid", "sudo", "cron", "netstat", "Process Inspection", "bash scripting"],
                        theory: `
                            <h3 style="color: #e84040; margin-bottom: 12px;">Linux Security Model</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Linux security rests on <strong>users, groups, and permissions</strong>. Every file and process has an owner and permission bits controlling read/write/execute for owner, group, and others.</p>

                            <h3 style="color: #e84040; margin-bottom: 12px;">Dangerous SUID Binaries</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;"><strong>SUID (Set User ID)</strong> makes a binary execute as its owner, not the caller. SUID root binaries run as root regardless of who executes them — a prime privilege escalation target.</p>

                            <div style="background: rgba(232,64,64,0.15); border-left: 4px solid #e84040; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #e84040; font-weight: bold; margin-bottom: 8px;">🔑 Key Commands for Pentesters</p>
                                <p style="color: #d1d5db; font-family: monospace; line-height: 1.8; margin: 0;">
                                    find / -perm -4000 -type f 2>/dev/null  # Find SUID files<br/>
                                    sudo -l                                   # List sudo privileges<br/>
                                    cat /etc/crontab                          # Scheduled tasks<br/>
                                    netstat -tulnp                            # Listening ports<br/>
                                    ps aux                                    # Running processes<br/>
                                    env                                       # Environment variables<br/>
                                    cat /etc/passwd | grep -v nologin         # User accounts
                                </p>
                            </div>`,
                        codeExample: "#!/bin/bash\n# Security audit script — run on authorized systems only\n\necho \"=== SYSTEM SECURITY AUDIT ===\"\necho \"Date: $(date)\"\necho \"\"\n\n# Check for SUID binaries\necho \"[+] SUID Binaries:\"\nfind / -perm -4000 -type f 2>/dev/null | sort\n\n# Check world-writable directories\necho \"\\n[+] World-Writable Directories:\"\nfind / -type d -perm -002 2>/dev/null | grep -v proc\n\n# Check for passwords in common config files\necho \"\\n[+] Potential Password Exposure:\"\ngrep -r \"password\" /etc/ 2>/dev/null | grep -v \"#\" | head -20\n\n# List listening services\necho \"\\n[+] Listening Services:\"\nss -tulnp 2>/dev/null || netstat -tulnp 2>/dev/null\n\n# Check sudoers\necho \"\\n[+] Sudo Configuration:\"\nsudo -l 2>/dev/null\n\n# Failed login attempts\necho \"\\n[+] Recent Failed Logins:\"\ngrep \"Failed password\" /var/log/auth.log 2>/dev/null | tail -10",
                        codeExplanation: "This audit script identifies common privilege escalation vectors. ss replaces the deprecated netstat on modern Linux. 2>/dev/null suppresses permission errors on inaccessible files.",
                        bestPractices: [
                            "Remove unnecessary SUID bits: chmod u-s /path/to/binary",
                            "Use principle of least privilege — no application runs as root",
                            "Enable auditd for system call logging",
                            "Regularly review cron jobs for writable scripts (privilege escalation vector)"
                        ],
                        startingCode: "#!/bin/bash\n# TODO: Extend the audit script to:\n# TODO: Check for users with UID 0 (root equivalent)\n# TODO: Find all writable cron jobs\n# TODO: List all installed packages and check against CVE database\n# TODO: Output results in JSON format for SIEM ingestion\n\necho \"Security Audit Starting...\""
                    },
                    {
                        id: 5,
                        title: "Threat Modeling with STRIDE & MITRE ATT&CK",
                        difficulty: "Advanced",
                        estimatedTime: "55 min",
                        keyTerms: ["STRIDE", "MITRE ATT&CK", "Threat Modeling", "Attack Tree", "Kill Chain", "Mitigations"],
                        theory: `
                            <h3 style="color: #e84040; margin-bottom: 12px;">STRIDE Threat Framework</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">STRIDE maps threats to security properties, guiding systematic vulnerability analysis of system designs:</p>
                            <table style="width:100%; border-collapse:collapse; color:#d1d5db; margin-bottom:15px; font-size:13px;">
                                <tr style="background:rgba(232,64,64,0.1);"><td style="padding:8px; color:#e84040; font-weight:bold;">Threat</td><td style="padding:8px; color:#e84040; font-weight:bold;">Property Violated</td><td style="padding:8px; color:#e84040; font-weight:bold;">Example</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px;"><strong>S</strong>poofing</td><td style="padding:8px;">Authentication</td><td style="padding:8px;">Fake login page</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px;"><strong>T</strong>ampering</td><td style="padding:8px;">Integrity</td><td style="padding:8px;">SQL injection modifies DB</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px;"><strong>R</strong>epudiation</td><td style="padding:8px;">Non-repudiation</td><td style="padding:8px;">Deleting audit logs</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px;"><strong>I</strong>nformation Disclosure</td><td style="padding:8px;">Confidentiality</td><td style="padding:8px;">Data breach, IDOR</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px;"><strong>D</strong>enial of Service</td><td style="padding:8px;">Availability</td><td style="padding:8px;">DDoS, resource exhaustion</td></tr>
                                <tr><td style="padding:8px;"><strong>E</strong>levation of Privilege</td><td style="padding:8px;">Authorization</td><td style="padding:8px;">Local privilege escalation</td></tr>
                            </table>
                            <h3 style="color: #e84040; margin-bottom: 12px;">MITRE ATT&CK Framework</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">A knowledge base of 14 tactics and 400+ techniques observed in real-world attacks. Maps adversary behavior from initial access through exfiltration. Used for detection engineering, purple teaming, and security gap analysis.</p>`,
                        codeExample: "# Threat modeling automation\nfrom dataclasses import dataclass, field\nfrom enum import Enum\n\nclass STRIDECategory(Enum):\n    SPOOFING             = \"Spoofing\"\n    TAMPERING            = \"Tampering\"\n    REPUDIATION          = \"Repudiation\"\n    INFORMATION_DISCLOSURE = \"Information Disclosure\"\n    DENIAL_OF_SERVICE    = \"Denial of Service\"\n    ELEVATION_OF_PRIVILEGE = \"Elevation of Privilege\"\n\n@dataclass\nclass Threat:\n    id: str\n    title: str\n    category: STRIDECategory\n    component: str\n    description: str\n    cvss_score: float\n    mitigations: list[str] = field(default_factory=list)\n    mitre_techniques: list[str] = field(default_factory=list)\n\n    @property\n    def severity(self) -> str:\n        if self.cvss_score >= 9.0: return \"Critical\"\n        if self.cvss_score >= 7.0: return \"High\"\n        if self.cvss_score >= 4.0: return \"Medium\"\n        return \"Low\"\n\n# Example: Threat model for a login endpoint\nlogin_threats = [\n    Threat(\n        id=\"T-001\",\n        title=\"Brute Force Authentication\",\n        category=STRIDECategory.SPOOFING,\n        component=\"/api/login\",\n        description=\"Attacker guesses credentials by trying many combinations\",\n        cvss_score=7.5,\n        mitigations=[\"Rate limiting\", \"Account lockout\", \"CAPTCHA\", \"MFA\"],\n        mitre_techniques=[\"T1110.001 - Password Guessing\"]\n    ),\n    Threat(\n        id=\"T-002\",\n        title=\"SQL Injection in Login Form\",\n        category=STRIDECategory.TAMPERING,\n        component=\"/api/login\",\n        description=\"Malicious SQL in username bypasses authentication\",\n        cvss_score=9.8,\n        mitigations=[\"Parameterized queries\", \"ORM\", \"Input validation\", \"WAF\"],\n        mitre_techniques=[\"T1190 - Exploit Public-Facing Application\"]\n    )\n]\n\nfor t in sorted(login_threats, key=lambda x: x.cvss_score, reverse=True):\n    print(f\"[{t.severity}] {t.id}: {t.title} — CVSS {t.cvss_score}\")",
                        codeExplanation: "Threat models are living documents. MITRE technique IDs link to detailed ATT&CK descriptions including real-world procedure examples and detection recommendations.",
                        bestPractices: [
                            "Conduct threat modeling during design — not after deployment",
                            "Prioritize mitigations by CVSS score and exploitability",
                            "Link every identified threat to specific MITRE ATT&CK techniques",
                            "Review threat model on every major architecture change"
                        ],
                        startingCode: "from dataclasses import dataclass\nfrom enum import Enum\n\n# TODO: Build a complete threat model for a banking web app\n# TODO: Include threats for: authentication, authorization, data transfer, storage\n# TODO: Add risk score calculation (likelihood × impact)\n# TODO: Generate a Markdown report sorted by severity\n# TODO: Map each threat to MITRE ATT&CK technique IDs\n\nclass Threat:\n    pass"
                    }
                ],
                quiz: [
                    { question: "What does the 'I' in CIA Triad stand for?", options: ["Intelligence", "Integrity", "Intrusion", "Infrastructure"], correctAnswer: 1 },
                    { question: "What is Passive Reconnaissance?", options: ["Scanning the target's ports", "Gathering public information without touching the target", "Intercepting network traffic", "Testing for SQL injection"], correctAnswer: 1 },
                    { question: "What does SUID on a binary mean?", options: ["File is encrypted", "Binary executes with the file owner's privileges, not the caller's", "File cannot be deleted", "Binary requires sudo"], correctAnswer: 1 },
                    { question: "What layer of OSI does ARP Poisoning target?", options: ["Layer 7 Application", "Layer 4 Transport", "Layer 2 Data Link", "Layer 3 Network"], correctAnswer: 2 },
                    { question: "What is the MITRE ATT&CK framework?", options: ["A list of CVEs", "A knowledge base of real-world attack tactics and techniques", "A firewall ruleset", "A password policy standard"], correctAnswer: 1 },
                    { question: "What STRIDE category does SQL Injection belong to?", options: ["Spoofing", "Tampering", "Repudiation", "Elevation of Privilege"], correctAnswer: 1 },
                    { question: "What does crt.sh reveal about a domain?", options: ["Email contacts", "All issued TLS certificates, revealing subdomains", "WHOIS records", "Shodan results"], correctAnswer: 1 },
                    { question: "What is a SYN Flood attack?", options: ["Flooding email inboxes", "Sending millions of TCP SYNs without completing handshake — exhausts server state", "Overflowing a buffer", "Brute forcing SSH"], correctAnswer: 1 },
                    { question: "What is the legal requirement before any penetration test?", options: ["Notification to ISP", "Written authorization from the system owner", "CVE disclosure", "Government license"], correctAnswer: 1 },
                    { question: "What does CVSS score 10.0 indicate?", options: ["Low severity", "Medium severity", "High severity", "Critical severity"], correctAnswer: 3 }
                ]
            },
            {
                moduleId: 2,
                moduleName: "Module 2: Web Application Security",
                moduleDescription: "OWASP Top 10, injection attacks, authentication flaws, and client-side vulnerabilities",
                lessons: [
                    {
                        id: 6,
                        title: "SQL Injection: From Detection to Exploitation",
                        difficulty: "Advanced",
                        estimatedTime: "65 min",
                        keyTerms: ["SQL Injection", "Blind SQLi", "Time-Based SQLi", "Parameterized Queries", "ORM", "sqlmap"],
                        theory: `
                            <h3 style="color: #e84040; margin-bottom: 12px;">SQL Injection: The #1 Web Vulnerability</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">SQLi occurs when user-supplied input is concatenated directly into SQL queries. Attackers inject SQL syntax to manipulate the query's logic, bypassing authentication or exfiltrating data.</p>

                            <h3 style="color: #e84040; margin-bottom: 12px;">SQLi Types</h3>
                            <ul style="margin-bottom: 15px; color: #d1d5db; padding-left: 20px; list-style-type: disc;">
                                <li style="margin-bottom: 8px;"><strong style="color:#ff4b4b;">In-Band Classic:</strong> Results returned directly in response. Use UNION-based extraction.</li>
                                <li style="margin-bottom: 8px;"><strong style="color:#ffca2c;">Blind Boolean:</strong> No output — infer data from true/false responses.</li>
                                <li style="margin-bottom: 8px;"><strong style="color:#ffca2c;">Blind Time-Based:</strong> Use SLEEP() delays to extract data bit by bit.</li>
                                <li style="margin-bottom: 8px;"><strong style="color:#00d527;">Out-of-Band:</strong> Data exfiltrated via DNS or HTTP to attacker server.</li>
                            </ul>

                            <div style="background: rgba(0,213,39,0.15); border-left: 4px solid #00d527; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #00d527; font-weight: bold; margin-bottom: 8px;">🛡️ Complete Prevention</p>
                                <p style="color: #d1d5db; margin: 0;"><strong>1. Parameterized queries</strong> (prepared statements) — never concatenate. <strong>2. ORM layer</strong> (SQLAlchemy, Django ORM). <strong>3. Stored procedures</strong> (with parameters). <strong>4. Least privilege DB user</strong> — app user should not have DROP or CREATE rights.</p>
                            </div>`,
                        codeExample: "# VULNERABLE code — for educational purposes only\n# Never do this in production!\ndef vulnerable_login(username, password):\n    query = f\"SELECT * FROM users WHERE name='{username}' AND pwd='{password}'\"\n    # username = \"admin'--\" makes query:\n    # SELECT * FROM users WHERE name='admin'--' AND pwd='anything'\n    # The -- comments out the password check!\n\n# SECURE: Parameterized query\nimport sqlite3\n\ndef secure_login(conn: sqlite3.Connection, username: str, password_hash: str):\n    cursor = conn.cursor()\n    # Parameters are escaped automatically — injection impossible\n    cursor.execute(\n        \"SELECT id, name, role FROM users WHERE username = ? AND password_hash = ?\",\n        (username, password_hash)  # Tuple, not f-string!\n    )\n    return cursor.fetchone()\n\n# SECURE: SQLAlchemy ORM\nfrom sqlalchemy.orm import Session\nfrom sqlalchemy import select\n\ndef orm_login(db: Session, username: str, password_hash: str):\n    stmt = select(User).where(\n        User.username == username,\n        User.password_hash == password_hash\n    )\n    return db.execute(stmt).scalar_one_or_none()\n\n# Input validation layer\nimport re\ndef validate_username(username: str) -> str:\n    if not re.match(r'^[a-zA-Z0-9_]{3,30}$', username):\n        raise ValueError(\"Invalid username format\")\n    return username",
                        codeExplanation: "The ? placeholder in sqlite3 passes parameters out-of-band — the DB driver handles escaping. The SQL structure is fixed at prepare time; user data cannot alter it.",
                        bestPractices: [
                            "NEVER use string concatenation or f-strings to build SQL",
                            "Use parameterized queries in every framework — they're always available",
                            "Run sqlmap on your own apps during pentest to verify protection",
                            "Implement WAF (Web Application Firewall) as defense-in-depth, not sole protection",
                            "Apply least privilege: app DB user should have only SELECT/INSERT/UPDATE needed"
                        ],
                        startingCode: "import sqlite3\n\n# TODO: Build a secure user database with:\n# TODO: create_user(username, password) — hash password with bcrypt\n# TODO: login(username, password) — constant-time comparison\n# TODO: search_users(query) — demonstrate parameterized LIKE search\n# TODO: Demonstrate that your implementation resists ' OR '1'='1 injection\n\ndef setup_db() -> sqlite3.Connection:\n    pass"
                    },
                    {
                        id: 7,
                        title: "XSS, CSRF & Client-Side Attacks",
                        difficulty: "Advanced",
                        estimatedTime: "60 min",
                        keyTerms: ["XSS", "Stored XSS", "Reflected XSS", "DOM XSS", "CSRF Token", "CSP", "SameSite Cookie"],
                        theory: `
                            <h3 style="color: #e84040; margin-bottom: 12px;">Cross-Site Scripting (XSS)</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">XSS injects malicious JavaScript into pages viewed by other users. Successful XSS allows session hijacking, keylogging, phishing redirects, and credential theft.</p>
                            <ul style="margin-bottom: 15px; color: #d1d5db; padding-left: 20px; list-style-type: disc;">
                                <li style="margin-bottom: 8px;"><strong style="color:#ff4b4b;">Stored XSS:</strong> Payload persists in DB — every visitor executes it. Highest impact.</li>
                                <li style="margin-bottom: 8px;"><strong style="color:#ffca2c;">Reflected XSS:</strong> Payload in URL — victim must click malicious link.</li>
                                <li style="margin-bottom: 8px;"><strong style="color:#ffca2c;">DOM XSS:</strong> Client-side JS writes user-controlled data to DOM unsafely.</li>
                            </ul>

                            <h3 style="color: #e84040; margin-bottom: 12px;">Cross-Site Request Forgery (CSRF)</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">CSRF tricks an authenticated user's browser into sending requests to a site where they're already logged in. The browser automatically sends session cookies — the server can't distinguish forged from legitimate requests without additional controls.</p>

                            <div style="background: rgba(0,213,39,0.15); border-left: 4px solid #00d527; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #00d527; font-weight: bold; margin-bottom: 8px;">🛡️ Defense Stack</p>
                                <p style="color: #d1d5db; font-family: monospace; line-height: 1.8; margin: 0;">
                                    XSS Prevention:<br/>
                                    ├─ Output encoding (context-aware: HTML, JS, URL, CSS)<br/>
                                    ├─ Content Security Policy (CSP) header<br/>
                                    └─ Trusted Types API (modern browsers)<br/><br/>
                                    CSRF Prevention:<br/>
                                    ├─ SameSite=Strict/Lax cookie attribute<br/>
                                    ├─ Synchronizer Token Pattern (CSRF token)<br/>
                                    └─ Origin/Referer header validation
                                </p>
                            </div>`,
                        codeExample: "from flask import Flask, request, session, escape\nimport secrets, html\n\napp = Flask(__name__)\napp.secret_key = secrets.token_hex(32)\n\n# VULNERABLE to XSS (don't do this)\n@app.route('/search_bad')\ndef search_bad():\n    query = request.args.get('q', '')\n    return f\"<h1>Results for: {query}</h1>\"  # XSS if query = <script>alert(1)</script>\n\n# SECURE: HTML encoding\n@app.route('/search_safe')\ndef search_safe():\n    query = html.escape(request.args.get('q', ''))  # Encodes < > & \" '\n    return f\"<h1>Results for: {query}</h1>\"\n\n# CSRF protection middleware\ndef generate_csrf_token() -> str:\n    if 'csrf_token' not in session:\n        session['csrf_token'] = secrets.token_urlsafe(32)\n    return session['csrf_token']\n\ndef validate_csrf(request_token: str) -> bool:\n    import hmac\n    stored = session.get('csrf_token', '')\n    # Constant-time comparison prevents timing attacks\n    return hmac.compare_digest(stored, request_token)\n\n# Security Headers (add to every response)\n@app.after_request\ndef security_headers(response):\n    response.headers['Content-Security-Policy'] = (\n        \"default-src 'self'; script-src 'self' 'nonce-{nonce}'; \"\n        \"object-src 'none'; base-uri 'none'\"\n    )\n    response.headers['X-Content-Type-Options'] = 'nosniff'\n    response.headers['X-Frame-Options'] = 'DENY'\n    response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'\n    return response",
                        codeExplanation: "hmac.compare_digest prevents timing attacks — it takes the same time regardless of where strings differ. CSP in strict mode blocks all inline scripts by default.",
                        bestPractices: [
                            "Use context-aware output encoding — not a global HTML escape",
                            "Implement a strict CSP with nonces — blocks XSS even if injection occurs",
                            "Set cookies: HttpOnly (no JS access), Secure (HTTPS only), SameSite=Strict",
                            "Use DOMPurify for sanitizing HTML that must contain markup"
                        ],
                        startingCode: "from flask import Flask, request\nimport html, secrets, hmac\n\napp = Flask(__name__)\n\n# TODO: Build a comment system that safely stores and displays user comments\n# TODO: Implement proper HTML encoding on output\n# TODO: Add CSRF token validation to POST /comment\n# TODO: Add all security headers in @app.after_request\n# TODO: Write tests demonstrating XSS payloads are neutralized\n\n@app.route('/comment', methods=['GET', 'POST'])\ndef comment():\n    pass"
                    },
                    {
                        id: 8,
                        title: "Authentication & Session Management Vulnerabilities",
                        difficulty: "Advanced",
                        estimatedTime: "60 min",
                        keyTerms: ["Password Hashing", "bcrypt", "JWT", "Session Fixation", "Insecure Direct Object Reference", "MFA"],
                        theory: `
                            <h3 style="color: #e84040; margin-bottom: 12px;">Password Storage: The Right Way</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Never store plaintext or MD5/SHA1 passwords. Use <strong>adaptive hashing</strong> algorithms specifically designed for passwords: <span style="font-family:monospace; color:#e84040;">bcrypt</span>, <span style="font-family:monospace; color:#e84040;">Argon2id</span>, or <span style="font-family:monospace; color:#e84040;">scrypt</span>. They're intentionally slow and resistant to GPU cracking.</p>

                            <h3 style="color: #e84040; margin-bottom: 12px;">JWT Security Issues</h3>
                            <ul style="margin-bottom: 15px; color: #d1d5db; padding-left: 20px; list-style-type: disc;">
                                <li style="margin-bottom: 8px;"><strong style="color:#ff4b4b;">Algorithm Confusion:</strong> CVE — servers accepting alg:none or RS256 tokens with HS256.</li>
                                <li style="margin-bottom: 8px;"><strong style="color:#ff4b4b;">Weak Secret:</strong> HS256 with password-quality secrets — brutable offline.</li>
                                <li style="margin-bottom: 8px;"><strong style="color:#ffca2c;">No Expiry:</strong> Missing exp claim creates eternal tokens.</li>
                                <li style="margin-bottom: 8px;"><strong style="color:#ffca2c;">Storing in localStorage:</strong> Accessible via XSS — use HttpOnly cookies instead.</li>
                            </ul>

                            <div style="background: rgba(232,64,64,0.15); border-left: 4px solid #e84040; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #e84040; font-weight: bold; margin-bottom: 8px;">🔑 IDOR: Insecure Direct Object Reference</p>
                                <p style="color: #d1d5db; margin: 0;">Accessing /api/users/<strong>42</strong>/invoice → change 42 to 43 → access another user's data. Authorization must check <em>every</em> resource access. Object IDs should never be sequential integers in APIs.</p>
                            </div>`,
                        codeExample: "import bcrypt, secrets, hmac, hashlib\nfrom datetime import datetime, timedelta, UTC\nimport jwt  # PyJWT library\n\n# Password hashing with bcrypt\ndef hash_password(password: str) -> bytes:\n    # Work factor 12 = ~300ms on modern hardware — deters brute force\n    return bcrypt.hashpw(password.encode(), bcrypt.gensalt(rounds=12))\n\ndef verify_password(password: str, hashed: bytes) -> bool:\n    # Constant-time comparison built into bcrypt\n    return bcrypt.checkpw(password.encode(), hashed)\n\n# Secure JWT creation and validation\nJWT_SECRET = secrets.token_hex(32)  # 256-bit secret\nALGORITHM  = \"HS256\"\n\ndef create_token(user_id: int, role: str, expire_minutes: int = 30) -> str:\n    payload = {\n        \"sub\": str(user_id),\n        \"role\": role,\n        \"iat\": datetime.now(UTC),\n        \"exp\": datetime.now(UTC) + timedelta(minutes=expire_minutes),\n        \"jti\": secrets.token_urlsafe(16)  # Unique token ID for revocation\n    }\n    return jwt.encode(payload, JWT_SECRET, algorithm=ALGORITHM)\n\ndef verify_token(token: str) -> dict:\n    try:\n        # CRITICAL: Explicitly specify allowed algorithms\n        payload = jwt.decode(token, JWT_SECRET, algorithms=[ALGORITHM])\n        return payload\n    except jwt.ExpiredSignatureError:\n        raise ValueError(\"Token expired\")\n    except jwt.InvalidTokenError as e:\n        raise ValueError(f\"Invalid token: {e}\")\n\n# IDOR prevention\ndef get_invoice(db, invoice_id: int, requesting_user_id: int) -> dict:\n    invoice = db.get_invoice(invoice_id)\n    if not invoice:\n        raise ValueError(\"Not found\")\n    if invoice['owner_id'] != requesting_user_id:  # Authorization check\n        raise PermissionError(\"Forbidden\")  # Don't reveal existence!\n    return invoice",
                        codeExplanation: "Specifying algorithms=[ALGORITHM] in jwt.decode prevents algorithm confusion attacks. The jti (JWT ID) claim enables token blocklisting for logout. IDOR check must happen on every resource access.",
                        bestPractices: [
                            "Use Argon2id over bcrypt for new systems — stronger against GPU attacks",
                            "Always specify allowed algorithms explicitly in JWT verification",
                            "Use opaque random session tokens instead of JWTs when server-side revocation is needed",
                            "Generate UUIDs (not sequential IDs) for externally-exposed resource IDs",
                            "Implement MFA for privileged accounts and sensitive operations"
                        ],
                        startingCode: "import bcrypt\nimport jwt\nimport secrets\n\n# TODO: Build a complete auth system:\n# TODO: register(username, password) — validate strength, hash, store\n# TODO: login(username, password) — verify, issue JWT with 15min expiry\n# TODO: refresh_token endpoint — issue new JWT if refresh token valid\n# TODO: logout — add jti to blocklist\n# TODO: protected_route — verify JWT, check blocklist, check role\n\ntokens_blocklist = set()\n\ndef register(username: str, password: str) -> dict:\n    pass"
                    },
                    {
                        id: 9,
                        title: "API Security & SSRF Vulnerabilities",
                        difficulty: "Advanced",
                        estimatedTime: "60 min",
                        keyTerms: ["SSRF", "IDOR", "API Rate Limiting", "Mass Assignment", "GraphQL Security", "OWASP API Top 10"],
                        theory: `
                            <h3 style="color: #e84040; margin-bottom: 12px;">Server-Side Request Forgery (SSRF)</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">SSRF tricks the server into making HTTP requests to attacker-controlled targets — including internal cloud metadata services (169.254.169.254 on AWS), internal APIs, and databases behind firewalls.</p>

                            <div style="background: rgba(255,75,75,0.15); border-left: 4px solid #ff4b4b; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #ff4b4b; font-weight: bold; margin-bottom: 8px;">💀 Real-World SSRF Impact (Capital One Breach 2019)</p>
                                <p style="color: #d1d5db; margin: 0;">An SSRF vulnerability allowed access to AWS EC2 metadata endpoint (169.254.169.254), leaking IAM credentials. Attacker used these credentials to access 100M+ customer records from S3. $80M fine.</p>
                            </div>

                            <h3 style="color: #e84040; margin-bottom: 12px;">OWASP API Security Top 10</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; font-family: monospace; background: rgba(255,255,255,0.05); padding: 10px; border-radius: 4px; line-height: 1.8;">
                                API1  — Broken Object Level Authorization (IDOR)<br/>
                                API2  — Broken Authentication<br/>
                                API3  — Broken Object Property Level Authorization<br/>
                                API4  — Unrestricted Resource Consumption (rate limiting)<br/>
                                API5  — Broken Function Level Authorization<br/>
                                API6  — Unrestricted Access to Sensitive Business Flows<br/>
                                API7  — Server Side Request Forgery<br/>
                                API8  — Security Misconfiguration<br/>
                                API9  — Improper Inventory Management<br/>
                                API10 — Unsafe Consumption of APIs
                            </p>`,
                        codeExample: "import ipaddress, socket\nfrom urllib.parse import urlparse\n\n# SSRF Prevention: URL validation\nBLOCKED_RANGES = [\n    ipaddress.ip_network('127.0.0.0/8'),\n    ipaddress.ip_network('10.0.0.0/8'),\n    ipaddress.ip_network('172.16.0.0/12'),\n    ipaddress.ip_network('192.168.0.0/16')\n]\n\ndef is_valid_url(url: str) -> bool:\n    parsed = urlparse(url)\n    if not parsed.scheme or not parsed.netloc:\n        return False\n    try:\n        ip = socket.gethostbyname(parsed.netloc)\n        if ipaddress.ip_address(ip) in BLOCKED_RANGES:\n            return False\n    except socket.gaierror:\n        return False\n    return True",
                        codeExplanation: "This function checks if the URL is well-formed and resolves to an IP address outside of private ranges. It prevents SSRF by blocking requests to internal services.",
                        bestPractices: [
                            "Implement strict allowlists for any server-side URL fetching",
                            "Use network-level controls (VPC, firewall rules) to block outbound traffic to sensitive internal IPs",
                            "Validate and sanitize all user-supplied URLs before making requests",
                            "Apply OWASP API Security Top 10 guidelines to all API development",
                            "Use API gateways with built-in security features (rate limiting, auth, input validation)" 
                               ],
                        startingCode: "import ipaddress, socket\nfrom urllib.parse import urlparse\nimport requests\n\n# TODO: Build a secure URL fetcher that prevents SSRF\n# TODO: Implement strict scheme allowlist (https only)\n# TODO: Block private/internal IP ranges including 169.254.169.254\n# TODO: Add rate limiting (max 10 requests per user per minute)\n# TODO: Log all outbound requests for audit trail\n\ndef safe_fetch(url: str, user_id: int) -> bytes:\n    pass"
                    },
                    {
                        id: 10,
                        title: "OWASP Top 10 & Secure Code Review",
                        difficulty: "Advanced",
                        estimatedTime: "65 min",
                        keyTerms: ["OWASP Top 10", "Insecure Deserialization", "Security Misconfiguration", "XXE", "Code Review", "SAST"],
                        theory: `
                            <h3 style="color: #e84040; margin-bottom: 12px;">OWASP Top 10 (2021) Overview</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">The OWASP Top 10 represents the most critical web application security risks, compiled from real vulnerability data across thousands of applications.</p>
                            <table style="width:100%; border-collapse:collapse; color:#d1d5db; margin-bottom:15px; font-size:12px;">
                                <tr style="background:rgba(232,64,64,0.1);"><td style="padding:8px; color:#e84040; font-weight:bold;">#</td><td style="padding:8px; color:#e84040; font-weight:bold;">Category</td><td style="padding:8px; color:#e84040; font-weight:bold;">Key Risk</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px;">A01</td><td style="padding:8px;">Broken Access Control</td><td style="padding:8px;">IDOR, privilege escalation</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px;">A02</td><td style="padding:8px;">Cryptographic Failures</td><td style="padding:8px;">Weak encryption, plaintext data</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px;">A03</td><td style="padding:8px;">Injection</td><td style="padding:8px;">SQLi, LDAP, OS command</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px;">A04</td><td style="padding:8px;">Insecure Design</td><td style="padding:8px;">Missing threat modeling</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px;">A05</td><td style="padding:8px;">Security Misconfiguration</td><td style="padding:8px;">Default creds, verbose errors</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px;">A06</td><td style="padding:8px;">Vulnerable Components</td><td style="padding:8px;">Outdated libraries with CVEs</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px;">A07</td><td style="padding:8px;">Auth Failures</td><td style="padding:8px;">Weak passwords, no MFA</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px;">A08</td><td style="padding:8px;">Integrity Failures</td><td style="padding:8px;">Insecure deserialization, CI/CD</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px;">A09</td><td style="padding:8px;">Logging Failures</td><td style="padding:8px;">No audit trail, silent failures</td></tr>
                                <tr><td style="padding:8px;">A10</td><td style="padding:8px;">SSRF</td><td style="padding:8px;">Internal service access</td></tr>
                            </table>

                            <h3 style="color: #e84040; margin-bottom: 12px;">Insecure Deserialization</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Deserializing untrusted data can lead to <strong>Remote Code Execution</strong>. Python's <span style="font-family:monospace;">pickle</span>, Java's native serialization, and PHP's <span style="font-family:monospace;">unserialize()</span> are notorious RCE vectors.</p>

                            <div style="background: rgba(232,64,64,0.15); border-left: 4px solid #e84040; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #e84040; font-weight: bold; margin-bottom: 8px;">☠️ XXE — XML External Entity Injection</p>
                                <p style="color: #d1d5db; margin: 0;">When XML parsers process external entity declarations, attackers can read local files (<span style="font-family:monospace;">file:///etc/passwd</span>), perform SSRF, or cause denial of service. <strong>Always disable external entities in XML parsers.</strong></p>
                            </div>`,
                        codeExample: "import pickle, json\nfrom defusedxml import ElementTree  # Safe XML parser\nfrom lxml import etree\n\n# NEVER pickle untrusted data — arbitrary code execution!\ndef vulnerable_deserialize(data: bytes):\n    return pickle.loads(data)  # RCE: attacker controls __reduce__\n\n# SAFE: Use JSON for data exchange\ndef safe_deserialize(data: str) -> dict:\n    try:\n        obj = json.loads(data)\n        # Validate structure against expected schema\n        if not isinstance(obj, dict):\n            raise ValueError(\"Expected JSON object\")\n        allowed_keys = {'name', 'age', 'email'}\n        return {k: v for k, v in obj.items() if k in allowed_keys}\n    except json.JSONDecodeError as e:\n        raise ValueError(f\"Invalid JSON: {e}\")\n\n# SAFE XML parsing — defusedxml blocks XXE\ndef safe_parse_xml(xml_string: str) -> dict:\n    try:\n        tree = ElementTree.fromstring(xml_string)  # Safe by default\n        return {'tag': tree.tag, 'text': tree.text}\n    except ElementTree.ParseError as e:\n        raise ValueError(f\"Invalid XML: {e}\")\n\n# SAST helper: detect dangerous patterns in code\nimport ast\n\ndef find_dangerous_calls(source_code: str) -> list:\n    \"\"\"Detect potentially dangerous function calls via AST analysis.\"\"\"\n    dangerous = {'eval', 'exec', 'pickle.loads', 'os.system', 'subprocess.call'}\n    findings = []\n    try:\n        tree = ast.parse(source_code)\n        for node in ast.walk(tree):\n            if isinstance(node, ast.Call):\n                if isinstance(node.func, ast.Name) and node.func.id in dangerous:\n                    findings.append({'line': node.lineno, 'call': node.func.id})\n    except SyntaxError:\n        pass\n    return findings",
                        codeExplanation: "defusedxml is a drop-in replacement for Python's xml module that disables XXE and other XML attack vectors. AST analysis catches dangerous patterns without executing code — the basis of SAST tools like Bandit.",
                        bestPractices: [
                            "Never use pickle, marshal, or shelve for untrusted input — use JSON/MessagePack",
                            "Disable XML external entities: parser.setFeature(feature_external_ges, False)",
                            "Run SAST tools (Bandit for Python, Semgrep, SonarQube) in CI/CD pipeline",
                            "Keep all dependencies updated — subscribe to GitHub Dependabot alerts",
                            "Never expose stack traces to end users — log internally, return generic error messages"
                        ],
                        startingCode: "from defusedxml import ElementTree\nimport json, ast\n\n# TODO: Build a SAST scanner that detects OWASP Top 10 patterns in Python code\n# TODO: Detect: eval/exec usage, pickle.loads, SQL string concatenation,\n# TODO:         hardcoded secrets (passwords, API keys in source)\n# TODO:         subprocess with shell=True\n# TODO: Output severity, line number, and remediation suggestion\n\ndef sast_scan(source_code: str) -> list[dict]:\n    findings = []\n    # Your implementation here\n    pass"
                    }
                ],
                quiz: [
                    { question: "What makes SQL injection possible?", options: ["Slow database queries", "User input concatenated directly into SQL strings", "Missing database indexes", "Unencrypted database connections"], correctAnswer: 1 },
                    { question: "Which password hashing algorithm is recommended for new systems?", options: ["MD5", "SHA-256", "Argon2id", "SHA-1"], correctAnswer: 2 },
                    { question: "What is Stored XSS?", options: ["XSS in URL parameters", "XSS payload persisted in database, executed for every visitor", "XSS via CSS", "XSS in HTTP headers"], correctAnswer: 1 },
                    { question: "What is the main defense against CSRF?", options: ["HTTPS", "SameSite cookie attribute and CSRF tokens", "Input validation", "Rate limiting"], correctAnswer: 1 },
                    { question: "Why is Python's pickle dangerous for untrusted data?", options: ["It's too slow", "It can execute arbitrary code during deserialization", "It doesn't support all types", "It requires root access"], correctAnswer: 1 },
                    { question: "What does SSRF allow an attacker to do?", options: ["Steal cookies", "Make the server issue requests to internal/unintended targets", "Inject SQL", "Bypass HTTPS"], correctAnswer: 1 },
                    { question: "What is an IDOR vulnerability?", options: ["Injecting code into object definitions", "Accessing another user's resources by changing an object ID in the request", "Integer overflow in database IDs", "Insecure DNS object resolution"], correctAnswer: 1 },
                    { question: "What is the purpose of a Content Security Policy (CSP)?", options: ["Encrypt page content", "Control which scripts and resources the browser is allowed to load, blocking XSS", "Compress HTTP responses", "Manage cookie policies"], correctAnswer: 1 },
                    { question: "What JWT vulnerability arises from accepting alg:none?", options: ["Token expiry is ignored", "Attacker can forge tokens without any valid signature", "Token size becomes too large", "Claims are not validated"], correctAnswer: 1 },
                    { question: "What tool is used for static analysis of Python security issues?", options: ["pylint", "black", "Bandit", "mypy"], correctAnswer: 2 }
                ]
            },
            {
                moduleId: 3,
                moduleName: "Module 3: Cryptography & PKI",
                moduleDescription: "Symmetric and asymmetric encryption, hashing, digital signatures, TLS, and public key infrastructure",
                lessons: [
                    {
                        id: 11,
                        title: "Symmetric Encryption & AES",
                        difficulty: "Advanced",
                        estimatedTime: "60 min",
                        keyTerms: ["AES", "Block Cipher", "CBC", "GCM", "IV", "Authenticated Encryption", "Key Derivation"],
                        theory: `
                            <h3 style="color: #e84040; margin-bottom: 12px;">Symmetric Encryption Fundamentals</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Symmetric encryption uses the <strong>same key</strong> for encryption and decryption. AES (Advanced Encryption Standard) is the gold standard — a block cipher operating on 128-bit blocks with 128, 192, or 256-bit keys.</p>

                            <h3 style="color: #e84040; margin-bottom: 12px;">Cipher Modes Matter</h3>
                            <table style="width:100%; border-collapse:collapse; color:#d1d5db; margin-bottom:15px; font-size:13px;">
                                <tr style="background:rgba(232,64,64,0.1);"><td style="padding:8px; color:#e84040; font-weight:bold;">Mode</td><td style="padding:8px; color:#e84040; font-weight:bold;">Authentication</td><td style="padding:8px; color:#e84040; font-weight:bold;">Use?</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px; font-family:monospace;">ECB</td><td style="padding:8px; color:#ff4b4b;">None</td><td style="padding:8px; color:#ff4b4b;">NEVER — reveals patterns</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px; font-family:monospace;">CBC</td><td style="padding:8px; color:#ffca2c;">None</td><td style="padding:8px; color:#ffca2c;">Legacy only + HMAC required</td></tr>
                                <tr><td style="padding:8px; font-family:monospace;">GCM</td><td style="padding:8px; color:#00d527;">Built-in (AEAD)</td><td style="padding:8px; color:#00d527;">Yes — modern standard</td></tr>
                            </table>

                            <div style="background: rgba(232,64,64,0.15); border-left: 4px solid #e84040; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #e84040; font-weight: bold; margin-bottom: 8px;">⚠️ ECB Mode — The Penguin Problem</p>
                                <p style="color: #d1d5db; margin: 0;">ECB encrypts each block independently. Identical plaintext blocks produce identical ciphertext blocks — <strong>patterns are preserved</strong>. The famous "ECB Penguin" image demonstrates this: encrypt a bitmap with ECB and the penguin outline is still visible in the ciphertext.</p>
                            </div>`,
                        codeExample: "from cryptography.hazmat.primitives.ciphers.aead import AESGCM\nfrom cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC\nfrom cryptography.hazmat.primitives import hashes\nimport os, base64\n\n# Key Derivation from password (PBKDF2 with 600,000 iterations — NIST 2023 rec)\ndef derive_key(password: str, salt: bytes = None) -> tuple[bytes, bytes]:\n    if salt is None:\n        salt = os.urandom(16)  # 128-bit salt — store alongside ciphertext\n    kdf = PBKDF2HMAC(\n        algorithm=hashes.SHA256(),\n        length=32,          # 256-bit AES key\n        salt=salt,\n        iterations=600_000  # Expensive to brute-force\n    )\n    key = kdf.derive(password.encode())\n    return key, salt\n\n# AES-256-GCM: Authenticated Encryption with Associated Data\ndef encrypt(plaintext: bytes, password: str) -> dict:\n    key, salt = derive_key(password)\n    nonce = os.urandom(12)   # 96-bit nonce — NEVER reuse with same key!\n    aesgcm = AESGCM(key)\n    ciphertext = aesgcm.encrypt(nonce, plaintext, associated_data=None)\n    return {\n        'ciphertext': base64.b64encode(ciphertext).decode(),\n        'nonce':      base64.b64encode(nonce).decode(),\n        'salt':       base64.b64encode(salt).decode()\n    }\n\ndef decrypt(encrypted: dict, password: str) -> bytes:\n    salt       = base64.b64decode(encrypted['salt'])\n    nonce      = base64.b64decode(encrypted['nonce'])\n    ciphertext = base64.b64decode(encrypted['ciphertext'])\n    key, _     = derive_key(password, salt)\n    aesgcm     = AESGCM(key)\n    # Raises InvalidTag if ciphertext was tampered with!\n    return aesgcm.decrypt(nonce, ciphertext, associated_data=None)\n\n# Usage\nencrypted = encrypt(b\"Top secret data\", \"hunter2\")\ndecrypted = decrypt(encrypted, \"hunter2\")\nassert decrypted == b\"Top secret data\"",
                        codeExplanation: "GCM mode provides both confidentiality and integrity — it raises InvalidTag if ciphertext is modified (tamper detection). The nonce must never be reused with the same key: nonce reuse in GCM completely breaks confidentiality.",
                        bestPractices: [
                            "Always use AES-GCM (AEAD) — never ECB, avoid CBC without separate HMAC",
                            "Generate nonces with os.urandom(12) — never use sequential counters",
                            "Derive keys from passwords using PBKDF2, bcrypt, or Argon2 — never hash directly",
                            "Store: ciphertext + nonce + salt. The nonce and salt are NOT secrets",
                            "Rotate encryption keys annually and re-encrypt stored data"
                        ],
                        startingCode: "from cryptography.hazmat.primitives.ciphers.aead import AESGCM\nimport os\n\n# TODO: Build a secure file encryption tool\n# TODO: Encrypt arbitrary files with a password-derived AES-256-GCM key\n# TODO: Store salt + nonce + ciphertext in a single .enc output file\n# TODO: Implement decrypt that reads the .enc file and restores original\n# TODO: Add integrity verification — detect if the file was tampered\n\ndef encrypt_file(input_path: str, output_path: str, password: str) -> None:\n    pass\n\ndef decrypt_file(input_path: str, output_path: str, password: str) -> None:\n    pass"
                    },
                    {
                        id: 12,
                        title: "Asymmetric Cryptography, Digital Signatures & TLS",
                        difficulty: "Advanced",
                        estimatedTime: "65 min",
                        keyTerms: ["RSA", "ECDSA", "Public Key", "Private Key", "Digital Signature", "Certificate", "TLS 1.3", "PKI"],
                        theory: `
                            <h3 style="color: #e84040; margin-bottom: 12px;">Asymmetric Cryptography</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Two mathematically linked keys: a <strong>public key</strong> (shared freely) and <strong>private key</strong> (kept secret). Encrypt with public key → only private key can decrypt. Sign with private key → anyone with public key can verify.</p>

                            <h3 style="color: #e84040; margin-bottom: 12px;">RSA vs Elliptic Curve</h3>
                            <table style="width:100%; border-collapse:collapse; color:#d1d5db; margin-bottom:15px; font-size:13px;">
                                <tr style="background:rgba(232,64,64,0.1);"><td style="padding:8px; color:#e84040; font-weight:bold;">Algorithm</td><td style="padding:8px; color:#e84040; font-weight:bold;">Key Size (112-bit security)</td><td style="padding:8px; color:#e84040; font-weight:bold;">Performance</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px;">RSA</td><td style="padding:8px;">2048 bits minimum</td><td style="padding:8px; color:#ffca2c;">Slower</td></tr>
                                <tr><td style="padding:8px;">ECDSA (P-256)</td><td style="padding:8px;">256 bits</td><td style="padding:8px; color:#00d527;">~10x faster</td></tr>
                            </table>

                            <h3 style="color: #e84040; margin-bottom: 12px;">TLS 1.3 Handshake</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; font-family: monospace; background: rgba(255,255,255,0.05); padding: 10px; border-radius: 4px; line-height: 1.8;">
                                1. Client Hello: supported cipher suites, key share (ECDHE)<br/>
                                2. Server Hello: chosen cipher, key share, certificate, Finished<br/>
                                3. Client: verifies cert chain, sends Finished<br/>
                                4. Encrypted application data (1-RTT)<br/>
                                — TLS 1.3 removed: RSA key exchange, RC4, 3DES, SHA-1 —<br/>
                                — All cipher suites now provide Forward Secrecy (ECDHE) —
                            </p>

                            <div style="background: rgba(0,213,39,0.15); border-left: 4px solid #00d527; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #00d527; font-weight: bold; margin-bottom: 8px;">🔐 Forward Secrecy</p>
                                <p style="color: #d1d5db; margin: 0;">Even if the server's private key is compromised later, past session keys cannot be derived. ECDHE generates ephemeral session keys discarded after use — historical traffic remains protected.</p>
                            </div>`,
                        codeExample: "from cryptography.hazmat.primitives.asymmetric import rsa, ec, padding\nfrom cryptography.hazmat.primitives import hashes, serialization\nfrom cryptography.hazmat.backends import default_backend\n\n# Generate EC key pair (P-256 — recommended over RSA for new systems)\nprivate_key = ec.generate_private_key(ec.SECP256R1(), default_backend())\npublic_key  = private_key.public_key()\n\n# Serialize private key (store securely, never commit to git!)\npem_private = private_key.private_bytes(\n    encoding=serialization.Encoding.PEM,\n    format=serialization.PrivateFormat.PKCS8,\n    encryption_algorithm=serialization.BestAvailableEncryption(b'key_password')\n)\n\n# Digital Signature — proves authenticity and integrity\nmessage = b\"Transfer $10,000 to account 12345\"\nsignature = private_key.sign(message, ec.ECDSA(hashes.SHA256()))\n\n# Verification — anyone with public key can verify\ntry:\n    public_key.verify(signature, message, ec.ECDSA(hashes.SHA256()))\n    print(\"Signature valid — message authentic and unmodified\")\nexcept Exception:\n    print(\"INVALID signature — message tampered or wrong key!\")\n\n# RSA for encryption (use only for key transport — not bulk data)\nrsa_key = rsa.generate_private_key(public_exponent=65537, key_size=2048)\nciphertext = rsa_key.public_key().encrypt(\n    b\"AES session key\",\n    padding.OAEP(\n        mgf=padding.MGF1(algorithm=hashes.SHA256()),\n        algorithm=hashes.SHA256(), label=None\n    )\n)\n# RSA-OAEP is the only safe RSA padding — never use PKCS1v15 for new systems",
                        codeExplanation: "ECDSA signatures are 64 bytes vs RSA-2048's 256 bytes. RSA-OAEP with SHA-256 is required for secure encryption — PKCS#1 v1.5 is vulnerable to Bleichenbacher oracle attacks.",
                        bestPractices: [
                            "Prefer ECDSA P-256 or Ed25519 over RSA for new systems",
                            "Enforce TLS 1.2 minimum, prefer TLS 1.3 — reject SSL 3.0, TLS 1.0/1.1",
                            "Pin certificate public keys in high-security mobile applications",
                            "Never store private keys in source code — use HSMs or secrets managers",
                            "Check certificate expiry in monitoring — Let's Encrypt certs expire every 90 days"
                        ],
                        startingCode: "from cryptography.hazmat.primitives.asymmetric import ec\nfrom cryptography.hazmat.primitives import hashes, serialization\n\n# TODO: Generate an ECDSA P-256 keypair\n# TODO: Sign a document and save signature to file\n# TODO: Implement a verify_document(doc, sig, pub_key) function\n# TODO: Simulate a man-in-the-middle: show that modified document fails verification\n# TODO: Export public key as PEM for distribution\n\ndef generate_signing_keypair() -> tuple:\n    pass\n\ndef sign_document(document: bytes, private_key) -> bytes:\n    pass\n\ndef verify_document(document: bytes, signature: bytes, public_key) -> bool:\n    pass"
                    }
                ],
                quiz: [
                    { question: "What makes AES-GCM superior to AES-CBC?", options: ["Faster key generation", "Provides both confidentiality and authentication (AEAD) — detects tampering", "Uses larger key sizes", "Requires no IV"], correctAnswer: 1 },
                    { question: "Why is AES-ECB mode dangerous?", options: ["It's too slow", "Identical plaintext blocks produce identical ciphertext — reveals patterns", "Key size is too small", "It requires padding attacks"], correctAnswer: 1 },
                    { question: "What is Forward Secrecy in TLS?", options: ["Encrypting future traffic in advance", "Ephemeral session keys mean past traffic stays safe even if server key is compromised", "Forwarding packets securely between servers", "Pre-shared key negotiation"], correctAnswer: 1 },
                    { question: "What is a digital signature used for?", options: ["Encrypting data for confidentiality", "Proving authenticity and integrity — message from holder of private key, unmodified", "Compressing data", "Generating session keys"], correctAnswer: 1 },
                    { question: "Why should PBKDF2 use 600,000+ iterations?", options: ["To increase key size", "To make password-to-key derivation slow, resisting brute-force attacks", "To improve entropy", "Required by AES specification"], correctAnswer: 1 },
                    { question: "What is the main advantage of ECDSA over RSA?", options: ["Stronger mathematical basis", "Much smaller key size for equivalent security — ~10x faster operations", "Supports larger messages", "No key generation required"], correctAnswer: 1 }
                ]
            },
            {
                moduleId: 4,
                moduleName: "Module 4: Network Security & Defense",
                moduleDescription: "Firewalls, IDS/IPS, VPNs, network monitoring, DDoS mitigation, and defensive architecture",
                lessons: [
                    {
                        id: 13,
                        title: "Firewalls, IDS/IPS & Network Segmentation",
                        difficulty: "Intermediate",
                        estimatedTime: "60 min",
                        keyTerms: ["Firewall", "IDS", "IPS", "WAF", "DMZ", "Zero Trust Network", "VLAN", "Micro-segmentation"],
                        theory: `
                            <h3 style="color: #e84040; margin-bottom: 12px;">Defense in Depth Architecture</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Modern networks layer multiple defensive controls — no single control is relied upon exclusively. A breach of the perimeter should not grant access to crown jewels.</p>
                            <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 6px; font-family: monospace; color: #d1d5db; line-height: 1.8; margin-bottom: 15px; font-size: 12px;">
                                Internet → [WAF] → [Perimeter Firewall] → DMZ → [Internal Firewall]<br/>
                                → [IDS/IPS] → [VLAN Segmentation] → App Servers<br/>
                                                                    → DB Servers (no internet access)<br/>
                                                                    → Internal Tools<br/>
                                Zero Trust: Every request authenticated, authorized, encrypted
                            </div>

                            <h3 style="color: #e84040; margin-bottom: 12px;">IDS vs IPS vs WAF</h3>
                            <table style="width:100%; border-collapse:collapse; color:#d1d5db; margin-bottom:15px; font-size:13px;">
                                <tr style="background:rgba(232,64,64,0.1);"><td style="padding:8px; color:#e84040; font-weight:bold;">Control</td><td style="padding:8px; color:#e84040; font-weight:bold;">Function</td><td style="padding:8px; color:#e84040; font-weight:bold;">Layer</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px;">IDS</td><td style="padding:8px;">Detects intrusions — alerts only</td><td style="padding:8px;">Network/Host</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px;">IPS</td><td style="padding:8px;">Detects AND blocks malicious traffic inline</td><td style="padding:8px;">Network</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px;">WAF</td><td style="padding:8px;">HTTP-layer filtering — SQLi, XSS, OWASP rules</td><td style="padding:8px;">Application</td></tr>
                                <tr><td style="padding:8px;">NGFW</td><td style="padding:8px;">Deep packet inspection + app awareness</td><td style="padding:8px;">Network</td></tr>
                            </table>

                            <div style="background: rgba(0,213,39,0.15); border-left: 4px solid #00d527; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #00d527; font-weight: bold; margin-bottom: 8px;">🏗️ Zero Trust Principles</p>
                                <p style="color: #d1d5db; margin: 0;">1. <strong>Never trust, always verify</strong> — authenticate every request regardless of network location. 2. <strong>Least privilege access</strong> — minimal permissions per identity. 3. <strong>Assume breach</strong> — design for containment, not just prevention.</p>
                            </div>`,
                        codeExample: "#!/usr/bin/env python3\n# iptables rule generator (educational)\nimport subprocess, ipaddress\n\ndef generate_firewall_ruleset(allowed_ssh_ips: list, web_ports: list) -> list:\n    \"\"\"Generate iptables rules following default-deny principle.\"\"\"\n    rules = [\n        # Default policy: DROP everything\n        \"iptables -P INPUT DROP\",\n        \"iptables -P FORWARD DROP\",\n        \"iptables -P OUTPUT ACCEPT\",\n\n        # Allow established connections\n        \"iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT\",\n\n        # Allow loopback\n        \"iptables -A INPUT -i lo -j ACCEPT\",\n\n        # Rate-limit ICMP (ping)\n        \"iptables -A INPUT -p icmp --icmp-type echo-request -m limit --limit 5/min -j ACCEPT\"\n    ]\n\n    # SSH — restricted to specific IPs\n    for ip in allowed_ssh_ips:\n        try:\n            ipaddress.ip_address(ip)\n            rules.append(f\"iptables -A INPUT -p tcp --dport 22 -s {ip} -j ACCEPT\")\n        except ValueError:\n            pass\n\n    # Web traffic — rate limited\n    for port in web_ports:\n        rules.extend([\n            f\"iptables -A INPUT -p tcp --dport {port} -m limit --limit 1000/min -j ACCEPT\",\n            f\"iptables -A INPUT -p tcp --dport {port} -j DROP\"\n        ])\n\n    # Log dropped packets\n    rules.append(\"iptables -A INPUT -j LOG --log-prefix 'DROPPED: ' --log-level 4\")\n    return rules\n\nruleset = generate_firewall_ruleset(\n    allowed_ssh_ips=['203.0.113.10'],\n    web_ports=[80, 443]\n)\nfor rule in ruleset:\n    print(rule)",
                        codeExplanation: "Default-deny policy drops all traffic not explicitly allowed. Rate limiting with -m limit prevents flood attacks on allowed ports. SSH restricted to known IPs eliminates internet-exposed SSH brute force.",
                        bestPractices: [
                            "Default-deny all inbound traffic — whitelist only necessary services",
                            "Segment networks: web tier, app tier, DB tier — no direct internet to DB",
                            "Enable Suricata or Snort IDS with rule sets updated daily",
                            "Log all firewall DROP events to centralized SIEM for analysis",
                            "Conduct quarterly firewall rule review — remove stale rules immediately"
                        ],
                        startingCode: "# TODO: Build a network monitoring tool that:\n# TODO: Parses /var/log/auth.log for SSH brute force attempts\n# TODO: Detects IPs with >5 failed logins in 60 seconds\n# TODO: Generates iptables DROP rules for detected IPs\n# TODO: Sends alert with attacker IP, attempt count, and timestamps\n# TODO: Maintains a persistent blocklist file\n\ndef detect_brute_force(log_file: str, threshold: int = 5, window_seconds: int = 60) -> list:\n    pass"
                    },
                    {
                        id: 14,
                        title: "DDoS Mitigation & Traffic Analysis",
                        difficulty: "Advanced",
                        estimatedTime: "55 min",
                        keyTerms: ["DDoS", "SYN Flood", "Amplification Attack", "Rate Limiting", "Anycast", "BGP Blackholing", "CAPTCHA"],
                        theory: `
                            <h3 style="color: #e84040; margin-bottom: 12px;">DDoS Attack Taxonomy</h3>
                            <table style="width:100%; border-collapse:collapse; color:#d1d5db; margin-bottom:15px; font-size:13px;">
                                <tr style="background:rgba(232,64,64,0.1);"><td style="padding:8px; color:#e84040; font-weight:bold;">Type</td><td style="padding:8px; color:#e84040; font-weight:bold;">Method</td><td style="padding:8px; color:#e84040; font-weight:bold;">Amplification</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px;">Volumetric</td><td style="padding:8px;">DNS/NTP amplification, UDP flood</td><td style="padding:8px; color:#ff4b4b;">Up to 4000x (NTP)</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px;">Protocol</td><td style="padding:8px;">SYN Flood, Ping of Death</td><td style="padding:8px;">N/A — state exhaustion</td></tr>
                                <tr><td style="padding:8px;">Application</td><td style="padding:8px;">HTTP Flood, Slowloris</td><td style="padding:8px;">Low volume, hard to detect</td></tr>
                            </table>

                            <h3 style="color: #e84040; margin-bottom: 12px;">Mitigation Strategies</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; font-family: monospace; background: rgba(255,255,255,0.05); padding: 10px; border-radius: 4px; line-height: 1.8; font-size: 12px;">
                                Layer 3/4 Attacks:<br/>
                                ├─ BGP Blackholing — route attack traffic to null<br/>
                                ├─ Anycast — spread traffic across global PoPs<br/>
                                └─ SYN cookies — stateless SYN-ACK without state table<br/><br/>
                                Layer 7 Attacks:<br/>
                                ├─ Rate limiting — per-IP, per-endpoint<br/>
                                ├─ CAPTCHAs / JS challenges<br/>
                                ├─ Behavioral analysis — bot fingerprinting<br/>
                                └─ CDN scrubbing (Cloudflare, Akamai)
                            </p>`,
                        codeExample: "import time\nfrom collections import defaultdict, deque\nfrom threading import Lock\n\nclass SlidingWindowRateLimiter:\n    \"\"\"\n    Token-bucket rate limiter with sliding window.\n    Thread-safe for concurrent web servers.\n    \"\"\"\n    def __init__(self, max_requests: int, window_seconds: int):\n        self.max_requests  = max_requests\n        self.window        = window_seconds\n        self.requests      = defaultdict(deque)  # ip -> deque of timestamps\n        self.lock          = Lock()\n\n    def is_allowed(self, client_ip: str) -> tuple[bool, dict]:\n        now = time.monotonic()\n        with self.lock:\n            q = self.requests[client_ip]\n            # Evict timestamps outside the window\n            while q and now - q[0] > self.window:\n                q.popleft()\n            if len(q) >= self.max_requests:\n                retry_after = int(self.window - (now - q[0])) + 1\n                return False, {\n                    'allowed':      False,\n                    'remaining':    0,\n                    'retry_after':  retry_after\n                }\n            q.append(now)\n            return True, {\n                'allowed':   True,\n                'remaining': self.max_requests - len(q),\n                'retry_after': 0\n            }\n\n# Usage in Flask\nfrom flask import Flask, request, jsonify\napp = Flask(__name__)\nlimiter = SlidingWindowRateLimiter(max_requests=100, window_seconds=60)\n\n@app.before_request\ndef rate_limit():\n    from flask import abort\n    ip = request.headers.get('CF-Connecting-IP', request.remote_addr)\n    allowed, info = limiter.is_allowed(ip)\n    if not allowed:\n        response = jsonify({'error': 'Rate limit exceeded'})\n        response.status_code = 429\n        response.headers['Retry-After'] = info['retry_after']\n        return response",
                        codeExplanation: "Sliding window is more accurate than fixed windows — no burst at window boundary. CF-Connecting-IP extracts real IP behind Cloudflare proxy. Retry-After header tells clients when to retry.",
                        bestPractices: [
                            "Use Cloudflare or AWS Shield for L3/L4 volumetric DDoS scrubbing",
                            "Enable SYN cookies on all Linux servers: sysctl net.ipv4.tcp_syncookies=1",
                            "Rate limit by IP + user identity — bots often share IP ranges",
                            "Set connection limits per IP on Nginx/Apache for Slowloris prevention",
                            "Test your defenses with authorized load tests before attackers do"
                        ],
                        startingCode: "from collections import defaultdict, deque\nimport time\n\n# TODO: Implement a multi-tier rate limiter:\n# TODO: Tier 1: 1000 requests/min per IP (general)\n# TODO: Tier 2: 10 requests/min per IP on /login (brute force protection)\n# TODO: Tier 3: 5 requests/hour per IP on /register (signup abuse)\n# TODO: Add IP blocklist with automatic expiry after 24h\n# TODO: Return informative headers: X-RateLimit-Remaining, X-RateLimit-Reset\n\nclass MultiTierRateLimiter:\n    pass"
                    },
                    {
                        id: 15,
                        title: "SIEM, Log Analysis & Incident Response",
                        difficulty: "Advanced",
                        estimatedTime: "65 min",
                        keyTerms: ["SIEM", "Log Aggregation", "Indicator of Compromise", "Incident Response", "NIST IR Framework", "Forensics", "Chain of Custody"],
                        theory: `
                            <h3 style="color: #e84040; margin-bottom: 12px;">NIST Incident Response Framework</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">A structured IR process limits damage, reduces recovery time, and preserves legal evidence. The NIST SP 800-61 framework defines four phases:</p>
                            <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 6px; font-family: monospace; color: #d1d5db; line-height: 2; margin-bottom: 15px; font-size: 13px;">
                                1. <span style="color:#e84040;">Preparation</span> — IR plan, tools, playbooks, backups, team training<br/>
                                2. <span style="color:#ffca2c;">Detection & Analysis</span> — SIEM alerts, log review, IoC identification<br/>
                                3. <span style="color:#ff4b4b;">Containment, Eradication & Recovery</span> — isolate, clean, restore<br/>
                                4. <span style="color:#00d527;">Post-Incident Activity</span> — lessons learned, control improvements
                            </div>

                            <h3 style="color: #e84040; margin-bottom: 12px;">Indicators of Compromise (IoCs)</h3>
                            <ul style="margin-bottom: 15px; color: #d1d5db; padding-left: 20px; list-style-type: disc;">
                                <li style="margin-bottom: 6px;"><strong>Network:</strong> Unusual outbound connections, DNS to DGA domains, large data transfers at odd hours</li>
                                <li style="margin-bottom: 6px;"><strong>Host:</strong> New SUID files, modified system binaries, unknown cron jobs, unusual processes</li>
                                <li style="margin-bottom: 6px;"><strong>Log:</strong> Multiple failed logins followed by success, privilege escalation, log gaps</li>
                            </ul>

                            <div style="background: rgba(232,64,64,0.15); border-left: 4px solid #e84040; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #e84040; font-weight: bold; margin-bottom: 8px;">📋 Chain of Custody</p>
                                <p style="color: #d1d5db; margin: 0;">Digital forensic evidence must maintain chain of custody: document who collected it, when, how, and where it was stored. Hash all evidence files (SHA-256) immediately upon collection — proves evidence was not modified.</p>
                            </div>`,
                        codeExample: "import re, hashlib, json\nfrom datetime import datetime, timezone\nfrom pathlib import Path\nfrom collections import defaultdict\n\nclass LogAnalyzer:\n    \"\"\"Basic SIEM log parser for SSH auth events.\"\"\"\n\n    FAILED_PATTERN  = re.compile(r'Failed password for .+ from (\\S+) port')\n    SUCCESS_PATTERN = re.compile(r'Accepted (?:password|publickey) for (\\S+) from (\\S+) port')\n    SUDO_PATTERN    = re.compile(r'sudo:.+COMMAND=(\\S+)')\n\n    def __init__(self):\n        self.failed_attempts = defaultdict(list)  # ip -> [timestamps]\n        self.alerts          = []\n\n    def parse_line(self, line: str) -> dict | None:\n        if m := self.FAILED_PATTERN.search(line):\n            ip = m.group(1)\n            self.failed_attempts[ip].append(datetime.now(timezone.utc))\n            if len(self.failed_attempts[ip]) >= 5:\n                self.alerts.append({\n                    'type':      'BRUTE_FORCE',\n                    'ip':        ip,\n                    'attempts':  len(self.failed_attempts[ip]),\n                    'severity':  'HIGH',\n                    'timestamp': datetime.now(timezone.utc).isoformat()\n                })\n        return None\n\n    def hash_evidence(self, filepath: str) -> dict:\n        \"\"\"SHA-256 hash for chain of custody documentation.\"\"\"\n        path = Path(filepath)\n        sha256 = hashlib.sha256()\n        with open(path, 'rb') as f:\n            for chunk in iter(lambda: f.read(65536), b''):\n                sha256.update(chunk)\n        return {\n            'file':      str(path.resolve()),\n            'sha256':    sha256.hexdigest(),\n            'size':      path.stat().st_size,\n            'collected': datetime.now(timezone.utc).isoformat(),\n            'collector': 'IR-Analyst-1'\n        }\n\nanalyzer = LogAnalyzer()\nprint(json.dumps(analyzer.alerts, indent=2))",
                        codeExplanation: "The walrus operator (:=) assigns and tests in one expression. SHA-256 of evidence files proves integrity — any modification changes the hash. SIEM rules trigger on patterns across multiple log lines over time.",
                        bestPractices: [
                            "Forward logs to immutable SIEM immediately — attackers delete local logs",
                            "Build detection rules for MITRE ATT&CK techniques — not just known malware",
                            "Practice IR tabletop exercises quarterly — muscle memory before real incidents",
                            "Never remediate before preserving evidence — image disks, capture memory",
                            "Document every action taken during IR with timestamps for legal proceedings"
                        ],
                        startingCode: "import re\nfrom collections import defaultdict\nfrom datetime import datetime\n\n# TODO: Build a full log analysis pipeline:\n# TODO: Parse auth.log, apache access.log, and syslog simultaneously\n# TODO: Correlate events: failed SSH + successful login within 10 min = alert\n# TODO: Detect port scans: >20 distinct ports from same IP within 60s\n# TODO: Export all IoCs to STIX 2.1 JSON format\n# TODO: Generate incident report with timeline\n\ndef analyze_logs(log_files: list[str]) -> dict:\n    pass"
                    }
                ],
                quiz: [
                    { question: "What is the key difference between IDS and IPS?", options: ["IDS is hardware, IPS is software", "IDS detects and alerts; IPS detects and actively blocks malicious traffic", "IDS covers network; IPS covers hosts", "IDS is open-source; IPS is commercial"], correctAnswer: 1 },
                    { question: "What is the default-deny firewall policy?", options: ["Allow all traffic by default", "Block all traffic by default — only explicitly allowed traffic passes", "Allow internal traffic, deny external", "Rate limit all traffic"], correctAnswer: 1 },
                    { question: "What is a DNS amplification DDoS attack?", options: ["Flooding DNS server with lookups", "Attacker sends small DNS queries with spoofed source IP — large responses sent to victim", "Poisoning DNS cache", "Hijacking DNS to redirect traffic"], correctAnswer: 1 },
                    { question: "What is the purpose of chain of custody in digital forensics?", options: ["Speed up investigation", "Document evidence handling to prove it was not tampered with — maintains legal admissibility", "Encrypt evidence files", "Share evidence between agencies"], correctAnswer: 1 },
                    { question: "Which phase of the NIST IR framework involves preserving evidence?", options: ["Preparation", "Post-Incident Activity", "Containment, Eradication & Recovery", "Detection & Analysis"], correctAnswer: 2 },
                    { question: "What is a sliding window rate limiter's advantage over fixed window?", options: ["Uses less memory", "Prevents burst attacks at window boundaries — more accurate traffic measurement", "Faster to compute", "Easier to implement"], correctAnswer: 1 }
                ]
            },
            {
                moduleId: 5,
                moduleName: "Module 5: Penetration Testing & Red Teaming",
                moduleDescription: "Methodology, exploitation techniques, privilege escalation, persistence, and reporting",
                lessons: [
                    {
                        id: 16,
                        title: "Penetration Testing Methodology",
                        difficulty: "Advanced",
                        estimatedTime: "60 min",
                        keyTerms: ["PTES", "Scope", "Rules of Engagement", "Vulnerability Assessment", "CVE Exploitation", "Metasploit", "Reporting"],
                        theory: `
                            <h3 style="color: #e84040; margin-bottom: 12px;">Penetration Testing Execution Standard (PTES)</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">The PTES defines a standardized methodology ensuring comprehensive, consistent, and legally compliant penetration tests across seven phases:</p>
                            <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 6px; font-family: monospace; color: #d1d5db; line-height: 2; margin-bottom: 15px; font-size: 12px;">
                                1. <span style="color:#e84040;">Pre-Engagement</span> — Scope, authorization, rules of engagement, NDAs<br/>
                                2. <span style="color:#e84040;">Intelligence Gathering</span> — OSINT, passive/active recon<br/>
                                3. <span style="color:#e84040;">Threat Modeling</span> — What would a real attacker target?<br/>
                                4. <span style="color:#e84040;">Vulnerability Analysis</span> — Automated scans + manual review<br/>
                                5. <span style="color:#e84040;">Exploitation</span> — Prove vulnerabilities are real, measure impact<br/>
                                6. <span style="color:#e84040;">Post-Exploitation</span> — Pivot, escalate, maintain access, data access<br/>
                                7. <span style="color:#e84040;">Reporting</span> — Executive summary + technical findings + remediation
                            </div>

                            <h3 style="color: #e84040; margin-bottom: 12px;">Pentest Types</h3>
                            <table style="width:100%; border-collapse:collapse; color:#d1d5db; margin-bottom:15px; font-size:13px;">
                                <tr style="background:rgba(232,64,64,0.1);"><td style="padding:8px; color:#e84040; font-weight:bold;">Type</td><td style="padding:8px; color:#e84040; font-weight:bold;">Attacker Knowledge</td><td style="padding:8px; color:#e84040; font-weight:bold;">Best For</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px;">Black Box</td><td style="padding:8px;">None — external attacker sim</td><td style="padding:8px;">Realistic APT simulation</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px;">Grey Box</td><td style="padding:8px;">Partial — authenticated user</td><td style="padding:8px;">Application logic testing</td></tr>
                                <tr><td style="padding:8px;">White Box</td><td style="padding:8px;">Full source + arch access</td><td style="padding:8px;">Most thorough coverage</td></tr>
                            </table>`,
                        codeExample: "# Pentest automation helpers (authorized targets only)\nimport subprocess, json\nfrom pathlib import Path\nfrom datetime import datetime\n\nclass PentestWorkspace:\n    \"\"\"Organized pentest workspace with evidence logging.\"\"\"\n\n    def __init__(self, target: str, tester: str):\n        self.target      = target\n        self.tester      = tester\n        self.start_time  = datetime.utcnow().isoformat()\n        self.findings    = []\n        self.workspace   = Path(f\"pentest_{target}_{datetime.utcnow().strftime('%Y%m%d')}\")\n        self.workspace.mkdir(exist_ok=True)\n        (self.workspace / 'evidence').mkdir(exist_ok=True)\n\n    def add_finding(self, title: str, severity: str, description: str,\n                    evidence: str, remediation: str, cvss: float = 0.0):\n        finding = {\n            'id':          f\"FIND-{len(self.findings)+1:03d}\",\n            'title':       title,\n            'severity':    severity,\n            'cvss':        cvss,\n            'description': description,\n            'evidence':    evidence,\n            'remediation': remediation,\n            'timestamp':   datetime.utcnow().isoformat()\n        }\n        self.findings.append(finding)\n        self._save_finding(finding)\n        return finding['id']\n\n    def _save_finding(self, finding: dict):\n        path = self.workspace / 'evidence' / f\"{finding['id']}.json\"\n        path.write_text(json.dumps(finding, indent=2))\n\n    def generate_report(self) -> str:\n        critical = [f for f in self.findings if f['severity'] == 'Critical']\n        high     = [f for f in self.findings if f['severity'] == 'High']\n        report_lines = [\n            f\"# Penetration Test Report — {self.target}\",\n            f\"Tester: {self.tester} | Date: {self.start_time}\",\n            f\"\\n## Executive Summary\",\n            f\"Total findings: {len(self.findings)} | Critical: {len(critical)} | High: {len(high)}\",\n            \"\\n## Findings (sorted by severity)\"\n        ]\n        for f in sorted(self.findings, key=lambda x: x['cvss'], reverse=True):\n            report_lines.append(f\"\\n### {f['id']}: {f['title']} [{f['severity']} — CVSS {f['cvss']}]\")\n            report_lines.append(f\"**Description:** {f['description']}\")\n            report_lines.append(f\"**Remediation:** {f['remediation']}\")\n        return '\\n'.join(report_lines)",
                        codeExplanation: "The workspace automatically organizes evidence by finding ID. Report generation sorts by CVSS score so the most critical issues appear first in the deliverable.",
                        bestPractices: [
                            "Get written authorization (scope of work) BEFORE any testing begins",
                            "Never exceed defined scope — pause and clarify if new systems are discovered",
                            "Document every command executed with timestamps for the activity log",
                            "Communicate critical findings immediately, don't wait for final report",
                            "Clean up all tools and backdoors after testing — restore original state"
                        ],
                        startingCode: "# TODO: Extend PentestWorkspace with:\n# TODO: automated_scan(host) — run nmap, parse results into findings\n# TODO: verify_finding(id) — re-test to confirm not a false positive\n# TODO: Generate a full HTML report with severity color coding\n# TODO: Calculate risk score per finding: likelihood × business_impact\n# TODO: Export findings to CSV for client ticketing system\n\nclass PentestWorkspace:\n    pass"
                    },
                    {
                        id: 17,
                        title: "Privilege Escalation Techniques",
                        difficulty: "Advanced",
                        estimatedTime: "65 min",
                        keyTerms: ["Privilege Escalation", "Kernel Exploit", "sudo Abuse", "PATH Hijacking", "Writable Service", "Token Impersonation", "GTFOBins"],
                        theory: `
                            <h3 style="color: #e84040; margin-bottom: 12px;">Linux Privilege Escalation Vectors</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">After gaining initial access, attackers escalate from a low-privileged shell to root. Understanding these vectors is essential for hardening and for realistic penetration testing.</p>

                            <h3 style="color: #e84040; margin-bottom: 12px;">Common Escalation Paths</h3>
                            <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 6px; font-family: monospace; color: #d1d5db; line-height: 1.8; margin-bottom: 15px; font-size: 12px;">
                                1. Kernel exploits (Dirty COW, OverlayFS — patch systems!)<br/>
                                2. sudo -l — commands executable as root:<br/>
                                   └─ sudo vim → :!/bin/bash (GTFOBins)<br/>
                                3. SUID binaries — find / -perm -4000 -type f<br/>
                                   └─ /usr/bin/find → find . -exec /bin/bash \\;<br/>
                                4. Writable /etc/cron* → replace legitimate script<br/>
                                5. PATH hijacking → malicious binary named 'ls' in writeable PATH dir<br/>
                                6. Writable service binary → replace with reverse shell<br/>
                                7. Weak file permissions on /etc/passwd → append root user
                            </div>

                            <div style="background: rgba(232,64,64,0.15); border-left: 4px solid #e84040; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #e84040; font-weight: bold; margin-bottom: 8px;">🔬 GTFOBins</p>
                                <p style="color: #d1d5db; margin: 0;"><strong>gtfobins.github.io</strong> documents how legitimate Unix binaries can be abused for privilege escalation, file reads, reverse shells, and more. If a binary has sudo rights, check GTFOBins first — many "safe" sudo allowances enable trivial root escalation.</p>
                            </div>`,
                        codeExample: "#!/usr/bin/env python3\n# Privilege Escalation Checker — run on authorized systems only\nimport subprocess, os, stat\nfrom pathlib import Path\n\ndef check_privesc_vectors() -> list:\n    \"\"\"Enumerate common privilege escalation vectors.\"\"\"\n    findings = []\n\n    # 1. SUID Binaries\n    try:\n        result = subprocess.run(\n            ['find', '/', '-perm', '-4000', '-type', 'f'],\n            capture_output=True, text=True, timeout=30\n        )\n        suid_bins = result.stdout.strip().split('\\n')\n        # Check against GTFOBins-known exploitable binaries\n        gtfobins = {'vim', 'find', 'awk', 'perl', 'python3', 'bash', 'env', 'nmap', 'less', 'more'}\n        for binary in suid_bins:\n            name = Path(binary).name\n            if name in gtfobins:\n                findings.append({\n                    'type':        'SUID_EXPLOITABLE',\n                    'path':        binary,\n                    'binary':      name,\n                    'severity':    'Critical',\n                    'remediation': f'chmod u-s {binary}',\n                    'reference':   f'https://gtfobins.github.io/gtfobins/{name}/#suid'\n                })\n    except Exception as e:\n        findings.append({'type': 'SCAN_ERROR', 'error': str(e)})\n\n    # 2. World-writable cron scripts\n    cron_dirs = ['/etc/cron.d', '/etc/cron.hourly', '/etc/cron.daily']\n    for cron_dir in cron_dirs:\n        p = Path(cron_dir)\n        if p.exists():\n            for f in p.iterdir():\n                if f.stat().st_mode & stat.S_IWOTH:  # World-writable\n                    findings.append({\n                        'type':     'WRITABLE_CRON',\n                        'path':     str(f),\n                        'severity': 'Critical',\n                        'remediation': f'chmod o-w {f}'\n                    })\n\n    # 3. Sudo rules\n    result = subprocess.run(['sudo', '-l'], capture_output=True, text=True)\n    if result.returncode == 0:\n        findings.append({\n            'type':    'SUDO_RULES',\n            'output':  result.stdout,\n            'note':    'Review against GTFOBins for exploitable commands'\n        })\n\n    return findings\n\nif __name__ == '__main__':\n    import json\n    vectors = check_privesc_vectors()\n    print(json.dumps(vectors, indent=2))",
                        codeExplanation: "stat.S_IWOTH checks the world-writable bit. GTFOBins cross-referencing automatically flags dangerous SUID binaries. The checker generates actionable remediation commands alongside each finding.",
                        bestPractices: [
                            "Patch kernel regularly — most kernel exploits have published PoCs within days",
                            "Audit sudo rules with visudo — use NOPASSWD sparingly and never for shells",
                            "Run LinPEAS/WinPEAS during authorized pentests — automated privesc enumeration",
                            "Use AppArmor or SELinux to confine processes even if they're compromised",
                            "Regularly audit SUID binaries: find / -perm -4000 — remove unnecessary ones"
                        ],
                        startingCode: "#!/usr/bin/env python3\n# TODO: Build a comprehensive privilege escalation checker:\n# TODO: Check /etc/passwd for users with UID 0 (besides root)\n# TODO: Check /etc/sudoers for dangerous rules (ALL, NOPASSWD)\n# TODO: Find writable directories in root's PATH\n# TODO: Check for credentials in environment variables (AWS_SECRET_KEY, etc.)\n# TODO: Detect running services as root that could be exploited\n# TODO: Generate JSON report with severity scores\n\ndef full_privesc_audit() -> dict:\n    report = {'critical': [], 'high': [], 'medium': [], 'info': []}\n    return report"
                    },
                    {
                        id: 18,
                        title: "Malware Analysis & Reverse Engineering Basics",
                        difficulty: "Advanced",
                        estimatedTime: "70 min",
                        keyTerms: ["Static Analysis", "Dynamic Analysis", "Sandbox", "Disassembly", "Strings Extraction", "YARA", "PE Header", "Obfuscation"],
                        theory: `
                            <h3 style="color: #e84040; margin-bottom: 12px;">Malware Analysis Approaches</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Malware analysts use two complementary techniques to understand malicious software without infecting production systems.</p>
                            <table style="width:100%; border-collapse:collapse; color:#d1d5db; margin-bottom:15px; font-size:13px;">
                                <tr style="background:rgba(232,64,64,0.1);"><td style="padding:8px; color:#e84040; font-weight:bold;">Approach</td><td style="padding:8px; color:#e84040; font-weight:bold;">Technique</td><td style="padding:8px; color:#e84040; font-weight:bold;">Tools</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px;">Static</td><td style="padding:8px;">Analyze without executing</td><td style="padding:8px;">strings, binwalk, Ghidra, IDA</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px;">Dynamic</td><td style="padding:8px;">Execute in isolated sandbox</td><td style="padding:8px;">Cuckoo, ANY.RUN, procmon</td></tr>
                                <tr><td style="padding:8px;">Hybrid</td><td style="padding:8px;">Both — correlate findings</td><td style="padding:8px;">CAPE Sandbox, IDA + debugger</td></tr>
                            </table>

                            <h3 style="color: #e84040; margin-bottom: 12px;">YARA Rules — Malware Signatures</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">YARA rules match byte patterns, strings, and conditions across files to identify malware families. Antivirus engines and SIEM tools use YARA for threat hunting.</p>
                            <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 6px; font-family: monospace; color: #d1d5db; line-height: 1.8; margin-bottom: 15px; font-size: 12px;">
                                rule Ransomware_Generic {<br/>
                                &nbsp;&nbsp;meta: description = "Generic ransomware indicator"<br/>
                                &nbsp;&nbsp;strings:<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;$ransom_note = "YOUR FILES ARE ENCRYPTED" nocase<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;$bitcoin = /[13][a-zA-Z0-9]{25,34}/<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;$ext = ".locked" wide ascii<br/>
                                &nbsp;&nbsp;condition:<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;any of them<br/>
                                }
                            </div>`,
                        codeExample: "import hashlib, re, os\nfrom pathlib import Path\n\nclass StaticAnalyzer:\n    \"\"\"Static malware analysis — no execution required.\"\"\"\n\n    SUSPICIOUS_STRINGS = [\n        'cmd.exe', 'powershell', 'regsvr32', 'certutil',\n        'mimikatz', 'meterpreter', 'HKEY_LOCAL_MACHINE',\n        'CreateRemoteThread', 'VirtualAllocEx', 'WriteProcessMemory'\n    ]\n\n    def analyze(self, filepath: str) -> dict:\n        path = Path(filepath)\n        data = path.read_bytes()\n\n        return {\n            'file':     str(path),\n            'size':     len(data),\n            'md5':      hashlib.md5(data).hexdigest(),\n            'sha256':   hashlib.sha256(data).hexdigest(),\n            'magic':    self._detect_magic(data),\n            'strings':  self._extract_strings(data),\n            'iocs':     self._extract_iocs(data),\n            'score':    self._threat_score(data)\n        }\n\n    def _detect_magic(self, data: bytes) -> str:\n        magic_bytes = {\n            b'MZ':             'PE Executable (Windows)',\n            b'\\x7fELF':       'ELF Executable (Linux)',\n            b'PK\\x03\\x04':    'ZIP Archive',\n            b'\\xca\\xfe\\xba\\xbe': 'Mach-O (macOS)'\n        }\n        for sig, name in magic_bytes.items():\n            if data.startswith(sig):\n                return name\n        return 'Unknown'\n\n    def _extract_strings(self, data: bytes, min_len: int = 6) -> list:\n        pattern = re.compile(rb'[\\x20-\\x7e]{' + str(min_len).encode() + rb',}')\n        strings = [m.group().decode('ascii', errors='replace') for m in pattern.finditer(data)]\n        suspicious = [s for s in strings if any(sus in s for sus in self.SUSPICIOUS_STRINGS)]\n        return suspicious[:50]  # Top 50 suspicious strings\n\n    def _extract_iocs(self, data: bytes) -> dict:\n        text = data.decode('latin-1')\n        return {\n            'urls':    re.findall(r'https?://[\\w/:%#\\$&\\?\\(\\)~\\.=\\+\\-]+', text)[:20],\n            'ips':     re.findall(r'\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b', text)[:20],\n            'emails':  re.findall(r'[\\w.+-]+@[\\w-]+\\.[\\w.-]+', text)[:10]\n        }\n\n    def _threat_score(self, data: bytes) -> int:\n        score = 0\n        text = data.decode('latin-1')\n        for indicator in self.SUSPICIOUS_STRINGS:\n            if indicator.lower() in text.lower():\n                score += 10\n        return min(score, 100)",
                        codeExplanation: "Magic bytes identify file format regardless of extension — malware often renames itself. Suspicious string extraction targets Windows API calls used for injection and persistence. IoC extraction feeds directly into threat intelligence platforms.",
                        bestPractices: [
                            "Always analyze malware in an isolated, snapshotted VM with no network access",
                            "Hash samples immediately (MD5, SHA1, SHA256) — search VirusTotal before analysis",
                            "Use FlareVM (Windows) or REMnux (Linux) — pre-configured malware analysis environments",
                            "Document all findings — malware behavior may be jurisdiction-specific legally",
                            "Share IoCs (IPs, domains, hashes) with threat intel platforms after analysis"
                        ],
                        startingCode: "import hashlib, re\nfrom pathlib import Path\n\n# TODO: Extend StaticAnalyzer with:\n# TODO: PE header parsing — check imports for suspicious DLLs (ws2_32, wininet)\n# TODO: Entropy calculation — high entropy sections indicate packing/encryption\n# TODO: YARA-style rule matching engine\n# TODO: VirusTotal API integration (check hash against VT)\n# TODO: Generate a structured IOC report in STIX 2.1 JSON format\n\ndef calculate_entropy(data: bytes) -> float:\n    \"\"\"Shannon entropy — packed malware typically > 7.0\"\"\"\n    if not data:\n        return 0.0\n    pass"
                    },
                    {
                        id: 19,
                        title: "Red Team Operations & C2 Frameworks",
                        difficulty: "Advanced",
                        estimatedTime: "65 min",
                        keyTerms: ["Red Team", "Blue Team", "Purple Team", "C2 Framework", "Lateral Movement", "Living off the Land", "Persistence Mechanisms", "OPSEC"],
                        theory: `
                            <h3 style="color: #e84040; margin-bottom: 12px;">Red vs Blue vs Purple Teaming</h3>
                            <table style="width:100%; border-collapse:collapse; color:#d1d5db; margin-bottom:15px; font-size:13px;">
                                <tr style="background:rgba(232,64,64,0.1);"><td style="padding:8px; color:#e84040; font-weight:bold;">Team</td><td style="padding:8px; color:#e84040; font-weight:bold;">Role</td><td style="padding:8px; color:#e84040; font-weight:bold;">Goal</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px; color:#ff4b4b;">Red Team</td><td style="padding:8px;">Simulates advanced attackers (APT)</td><td style="padding:8px;">Find gaps in defenses</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px; color:#00d527;">Blue Team</td><td style="padding:8px;">Defends, monitors, responds</td><td style="padding:8px;">Detect and contain threats</td></tr>
                                <tr><td style="padding:8px; color:#a78bfa;">Purple Team</td><td style="padding:8px;">Red + Blue collaborate openly</td><td style="padding:8px;">Accelerate detection capability</td></tr>
                            </table>

                            <h3 style="color: #e84040; margin-bottom: 12px;">Living off the Land (LotL)</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; line-height: 1.6;">Advanced attackers avoid custom malware — they use tools already installed on the target. This evades antivirus and blends into legitimate admin activity.</p>
                            <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 6px; font-family: monospace; color: #d1d5db; line-height: 1.8; margin-bottom: 15px; font-size: 12px;">
                                Windows LotL Binaries (LOLBins):<br/>
                                ├─ powershell.exe — script execution, download cradles<br/>
                                ├─ certutil.exe — decode base64, download files<br/>
                                ├─ mshta.exe — execute VBScript/JScript from URLs<br/>
                                └─ wmic.exe — lateral movement, process creation<br/><br/>
                                Linux LotL:<br/>
                                ├─ curl/wget — download payloads<br/>
                                ├─ python3 -c — execute inline code<br/>
                                └─ crontab — persistence without new binaries
                            </div>

                            <div style="background: rgba(232,64,64,0.15); border-left: 4px solid #e84040; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #e84040; font-weight: bold; margin-bottom: 8px;">📡 OPSEC — Operational Security</p>
                                <p style="color: #d1d5db; margin: 0;">Red teamers maintain OPSEC to avoid detection: use redirectors in front of C2 servers, rotate infrastructure, use legitimate domains (domain fronting), and match behavior to legitimate admin traffic patterns.</p>
                            </div>`,
                        codeExample: "# Lateral movement simulation (authorized lab environment only)\nimport socket, threading, base64\nfrom dataclasses import dataclass, field\nfrom typing import Callable\n\n@dataclass\nclass RedTeamOperation:\n    \"\"\"Track a red team engagement — for authorized lab use only.\"\"\"\n    name:         str\n    target_range: str\n    objectives:   list[str]\n    phase:        str = 'reconnaissance'\n    compromised:  list[str] = field(default_factory=list)\n    lateral_path: list[str] = field(default_factory=list)\n    iocs_left:    list[str] = field(default_factory=list)\n\n    PHASES = ['reconnaissance', 'initial_access', 'execution', \n              'persistence', 'privilege_escalation', 'lateral_movement',\n              'collection', 'exfiltration', 'command_and_control']\n\n    def advance_phase(self) -> str:\n        idx = self.PHASES.index(self.phase)\n        if idx + 1 < len(self.PHASES):\n            self.phase = self.PHASES[idx + 1]\n        return self.phase\n\n    def compromise_host(self, ip: str, method: str, privilege: str):\n        self.compromised.append(ip)\n        self.lateral_path.append(f\"{method} → {ip} ({privilege})\")\n        # Good OPSEC: document what IoCs you're leaving\n        if method in ('psexec', 'wmic', 'smbexec'):\n            self.iocs_left.append(f\"Windows Event ID 4624 on {ip}\")\n            self.iocs_left.append(f\"ADMIN$ share access from previous hop\")\n\n    def opsec_check(self) -> list[str]:\n        \"\"\"What would a Blue Team detect?\"\"\"\n        detectable = []\n        if len(self.compromised) > 3:\n            detectable.append(\"High lateral movement — beacon pattern in DNS/HTTP logs\")\n        if 'psexec' in str(self.lateral_path):\n            detectable.append(\"PsExec artifacts: PSEXESVC service, Event ID 7045\")\n        return detectable\n\nop = RedTeamOperation(\n    name='OP-GHOST',\n    target_range='192.168.10.0/24',\n    objectives=['Access HR file server', 'Demonstrate domain admin escalation']\n)\nop.compromise_host('192.168.10.5', 'phishing', 'user')\nop.advance_phase()\nprint(op.opsec_check())",
                        codeExplanation: "Tracking IoCs left behind is critical for red team reporting — the blue team needs to know what to look for to validate their detection capabilities. OPSEC analysis makes the engagement actionable.",
                        bestPractices: [
                            "Document every action, tool, and IoC during red team operations",
                            "Use unique malware samples per engagement — avoids cross-contamination",
                            "Always have out-of-band emergency contact with client security team",
                            "Purple team after red team: walk blue team through exact kill chain",
                            "Debrief findings within 48 hours — memory fades, threats don't wait"
                        ],
                        startingCode: "from dataclasses import dataclass, field\n\n# TODO: Build a kill chain tracker that:\n# TODO: Maps each action to the corresponding MITRE ATT&CK technique ID\n# TODO: Calculates 'dwell time' — time between initial access and detection\n# TODO: Generates a visual timeline of the attack (ASCII or HTML)\n# TODO: Produces a detection gap analysis for the blue team\n# TODO: Estimates realistic business impact of each compromised asset\n\n@dataclass\nclass KillChainTracker:\n    operation_name: str\n    start_time: str\n    events: list = field(default_factory=list)\n\n    def add_event(self, technique_id: str, technique_name: str,\n                  description: str, detected: bool = False) -> None:\n        pass"
                    },
                    {
                        id: 20,
                        title: "Career Paths, Certifications & Continuous Learning",
                        difficulty: "Intermediate",
                        estimatedTime: "40 min",
                        keyTerms: ["CEH", "OSCP", "CISSP", "Bug Bounty", "CTF", "Security Research", "Responsible Disclosure"],
                        theory: `
                            <h3 style="color: #e84040; margin-bottom: 12px;">Cybersecurity Career Paths</h3>
                            <table style="width:100%; border-collapse:collapse; color:#d1d5db; margin-bottom:15px; font-size:13px;">
                                <tr style="background:rgba(232,64,64,0.1);"><td style="padding:8px; color:#e84040; font-weight:bold;">Role</td><td style="padding:8px; color:#e84040; font-weight:bold;">Focus</td><td style="padding:8px; color:#e84040; font-weight:bold;">Key Skills</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px;">Penetration Tester</td><td style="padding:8px;">Offensive security</td><td style="padding:8px;">Metasploit, OSCP, web attacks</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px;">SOC Analyst</td><td style="padding:8px;">Detection & response</td><td style="padding:8px;">SIEM, log analysis, triage</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px;">AppSec Engineer</td><td style="padding:8px;">Secure SDLC</td><td style="padding:8px;">Code review, SAST/DAST</td></tr>
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px;">Malware Analyst</td><td style="padding:8px;">Threat intelligence</td><td style="padding:8px;">Reverse engineering, YARA</td></tr>
                                <tr><td style="padding:8px;">Cloud Security</td><td style="padding:8px;">Cloud infrastructure</td><td style="padding:8px;">AWS/Azure security, IAM</td></tr>
                            </table>

                            <h3 style="color: #e84040; margin-bottom: 12px;">Certification Roadmap</h3>
                            <p style="margin-bottom: 15px; color: #d1d5db; font-family: monospace; background: rgba(255,255,255,0.05); padding: 10px; border-radius: 4px; line-height: 1.8; font-size: 12px;">
                                Entry: CompTIA Security+ → Network+<br/>
                                Intermediate: eJPT (eLearnSecurity) → CEH<br/>
                                Advanced Offensive: OSCP → OSEP → OSED (OffSec)<br/>
                                Advanced Defensive: CISSP → CISM<br/>
                                Cloud: AWS Security Specialty → CCSP<br/>
                                Bug Bounty: HackerOne → Bugcrowd (no cert required — just skill)
                            </p>

                            <h3 style="color: #e84040; margin-bottom: 12px;">Continuous Skill Development</h3>
                            <ul style="margin-bottom: 15px; color: #d1d5db; padding-left: 20px; list-style-type: disc;">
                                <li style="margin-bottom: 6px;"><strong style="color:#e84040;">CTF Platforms:</strong> Hack The Box, TryHackMe, PicoCTF, CTFtime.org</li>
                                <li style="margin-bottom: 6px;"><strong style="color:#e84040;">Vulnerable VMs:</strong> VulnHub, DVWA, Metasploitable, HackTheBox machines</li>
                                <li style="margin-bottom: 6px;"><strong style="color:#e84040;">Bug Bounty:</strong> HackerOne, Bugcrowd — real targets, real payouts</li>
                                <li style="margin-bottom: 6px;"><strong style="color:#e84040;">Research:</strong> Follow CVE disclosures, read security conference papers (DEF CON, Black Hat)</li>
                            </ul>

                            <div style="background: rgba(0,213,39,0.15); border-left: 4px solid #00d527; padding: 15px; margin: 20px 0; border-radius: 6px;">
                                <p style="color: #00d527; font-weight: bold; margin-bottom: 8px;">🏆 Cybersecurity Mastery Achieved</p>
                                <p style="color: #d1d5db; line-height: 1.6; margin: 0;">From CIA triad to red team operations — you've mastered the full security spectrum: reconnaissance, web attacks, cryptography, network defense, malware analysis, and penetration testing methodology. The security community needs ethical professionals who understand both sides of the battlefield. Welcome to the field.</p>
                            </div>`,
                        codeExample: "# Bug Bounty automation helper\nimport requests, re\nfrom urllib.parse import urljoin\n\nclass BugBountyScout:\n    \"\"\"Automate initial recon for bug bounty programs.\"\"\"\n\n    def __init__(self, target: str, scope: list[str]):\n        self.target  = target\n        self.scope   = scope  # List of in-scope domains from program rules\n        self.session = requests.Session()\n        self.session.headers['User-Agent'] = 'Security-Researcher/1.0'\n\n    def is_in_scope(self, url: str) -> bool:\n        \"\"\"Never test out-of-scope targets — instant ban.\"\"\"\n        from urllib.parse import urlparse\n        domain = urlparse(url).netloc\n        return any(domain.endswith(s) for s in self.scope)\n\n    def check_security_headers(self, url: str) -> dict:\n        if not self.is_in_scope(url):\n            raise ValueError(f\"{url} is OUT OF SCOPE\")\n        try:\n            r = self.session.get(url, timeout=10, allow_redirects=True)\n            required = {\n                'Strict-Transport-Security': None,\n                'Content-Security-Policy':   None,\n                'X-Content-Type-Options':    None,\n                'X-Frame-Options':           None,\n                'Referrer-Policy':           None\n            }\n            present   = {h: r.headers.get(h) for h in required if h in r.headers}\n            missing   = [h for h in required if h not in r.headers]\n            return {'url': url, 'missing_headers': missing, 'present': present,\n                    'server': r.headers.get('Server', 'hidden'),\n                    'x_powered_by': r.headers.get('X-Powered-By', 'hidden')}\n        except requests.RequestException as e:\n            return {'error': str(e)}\n\n    def find_endpoints(self, base_url: str) -> list:\n        \"\"\"Discover endpoints from JavaScript files.\"\"\"\n        endpoints = set()\n        try:\n            r = self.session.get(base_url, timeout=10)\n            js_files = re.findall(r'src=[\"\\']([^\"\\'>]+\\.js)[\"\\']', r.text)\n            for js_url in js_files[:10]:  # Limit requests\n                js_full = urljoin(base_url, js_url)\n                if self.is_in_scope(js_full):\n                    js_r = self.session.get(js_full, timeout=10)\n                    found = re.findall(r'[\"\\'](/api/[\\w/{}:?=&-]+)[\"\\']', js_r.text)\n                    endpoints.update(found)\n        except Exception:\n            pass\n        return list(endpoints)",
                        codeExplanation: "The scope check on every request prevents accidental out-of-scope testing — critical for bug bounty. JavaScript endpoint extraction finds undocumented API endpoints that developers forgot to protect.",
                        bestPractices: [
                            "Read the entire bug bounty program scope before testing anything",
                            "Start with passive recon and security header checks — safe, always in scope",
                            "Document every step with screenshots — bug reports need evidence to be paid",
                            "Focus on business logic flaws — automated scanners miss these entirely",
                            "Build a home lab with vulnerable apps — practice legally before hunting"
                        ],
                        startingCode: "# TODO: Build your personal security research toolkit:\n# TODO: subdomain_enum(domain) — crt.sh + DNS brute force\n# TODO: tech_stack(url) — identify frameworks from headers, cookies, HTML\n# TODO: check_cors(url) — test for misconfigured CORS policies\n# TODO: find_admin_panels(domain) — common admin URL discovery\n# TODO: Export all findings to a Markdown report\n\ndef build_recon_report(target: str, scope: list[str]) -> str:\n    report = f\"# Recon Report: {target}\\n\"\n    return report"
                    }
                ],
                quiz: [
                    { question: "What is the first step of any penetration test?", options: ["Run nmap scan", "Execute exploits", "Obtain written authorization defining scope", "Deploy Metasploit"], correctAnswer: 2 },
                    { question: "What are GTFOBins?", options: ["A vulnerability database", "Documentation of how Unix binaries can be abused for privilege escalation", "A penetration testing framework", "A list of default credentials"], correctAnswer: 1 },
                    { question: "What is 'Living off the Land' in red team operations?", options: ["Testing agricultural networks", "Using pre-installed system tools to avoid detection", "Deploying custom malware", "Targeting IoT devices"], correctAnswer: 1 },
                    { question: "What does Shannon entropy > 7.0 indicate in a file section?", options: ["File is corrupted", "Section is likely packed or encrypted (common in malware)", "File is compressed legitimately", "File uses UTF-8 encoding"], correctAnswer: 1 },
                    { question: "What is the primary purpose of YARA rules?", options: ["Firewall rule syntax", "Pattern matching to identify and classify malware families", "Encryption algorithm specification", "Network packet filtering"], correctAnswer: 1 },
                    { question: "What is the OSCP certification known for?", options: ["Multiple choice exam", "24-hour hands-on practical exploitation exam", "Management-level certification", "Cloud security specialization"], correctAnswer: 1 },
                    { question: "What is lateral movement in a cyberattack?", options: ["Moving physical hardware", "Attacker moving between systems within a compromised network", "Downloading data to external server", "Escalating to root on current host"], correctAnswer: 1 },
                    { question: "Why is scope enforcement critical in bug bounty programs?", options: ["To limit server load", "Testing out-of-scope targets violates program rules and is potentially illegal", "Scope defines payment amounts", "To avoid duplicate reports"], correctAnswer: 1 }
                ]
            }
        ],
        quiz: [
            { question: "What does the CIA Triad stand for?", options: ["Control, Integrity, Authentication", "Confidentiality, Integrity, Availability", "Cryptography, Intrusion, Analysis", "Certification, Identity, Authorization"], correctAnswer: 1 },
            { question: "What is the safest password hashing algorithm for new systems?", options: ["MD5", "SHA-256", "Argon2id", "bcrypt"], correctAnswer: 2 },
            { question: "What vulnerability allowed the Capital One breach via cloud metadata?", options: ["SQL Injection", "Server-Side Request Forgery (SSRF)", "XSS", "Broken Authentication"], correctAnswer: 1 },
            { question: "What cipher mode provides both encryption and authentication?", options: ["ECB", "CBC", "CTR", "GCM (AEAD)"], correctAnswer: 3 },
            { question: "What does MITRE ATT&CK provide?", options: ["CVE scoring system", "Firewall rule templates", "Knowledge base of real-world attack tactics and techniques", "Certificate authority standards"], correctAnswer: 2 },
            { question: "What is the purpose of a CSRF token?", options: ["Encrypt form data", "Prevent cross-site request forgery by validating request origin", "Rate limit form submissions", "Authenticate the user's identity"], correctAnswer: 1 },
            { question: "What makes AES-ECB mode insecure?", options: ["Key size is too small", "No authentication tag", "Identical plaintext blocks produce identical ciphertext — reveals patterns", "It requires padding"], correctAnswer: 2 },
            { question: "What is Forward Secrecy in TLS?", options: ["Pre-computing session keys", "Ephemeral key exchange ensures past sessions remain secure even if the server key is later compromised", "Forwarding packets to backup servers", "Caching TLS sessions for performance"], correctAnswer: 1 },
            { question: "What is a SUID binary and why is it dangerous?", options: ["A signed binary — safe to execute", "Executes with file owner's privileges — SUID root binaries can be abused for privilege escalation", "A binary with integrity verification", "A binary that requires sudo to run"], correctAnswer: 1 },
            { question: "What framework defines penetration testing phases: recon, exploitation, reporting?", options: ["OWASP", "NIST CSF", "PTES (Penetration Testing Execution Standard)", "ISO 27001"], correctAnswer: 2 },
            { question: "How does a SYN Flood attack work?", options: ["Flooding DNS with requests", "Sending massive SYN packets without completing TCP handshake, exhausting server state tables", "Overflowing network buffers", "Sending oversized ICMP packets"], correctAnswer: 1 },
            { question: "What is the key defense against SQL injection?", options: ["Input length validation", "Parameterized queries / prepared statements — separates SQL structure from data", "HTML encoding", "WAF rules"], correctAnswer: 1 },
            { question: "What does chain of custody ensure in digital forensics?", options: ["Evidence collection speed", "Legal admissibility by documenting evidence handling and proving it was not tampered", "Evidence encryption", "Cross-agency sharing"], correctAnswer: 1 },
            { question: "What is Living off the Land (LotL) in red teaming?", options: ["Targeting agricultural infrastructure", "Using pre-installed OS tools to perform attacks — avoids antivirus detection", "Testing internet-of-things devices", "Physically accessing server rooms"], correctAnswer: 1 },
            { question: "Which OWASP API risk covers accessing other users' data by changing object IDs?", options: ["API2 Broken Authentication", "API4 Rate Limiting", "API1 Broken Object Level Authorization (IDOR)", "API8 Security Misconfiguration"], correctAnswer: 2 }
        ]
    }
};
     