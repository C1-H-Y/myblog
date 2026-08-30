---
title: Mott绝缘体
date: 2026-07-25
categories:
  - condensed matter
--- 

更为准确的说是Mott相变，来自相互作用对电子在材料中的阻滞现象。

比较经典的模型为Hubbard Model。

$$
H=-\sum_{\langle i,j\rangle,\sigma}c_{i\sigma}^\dagger c_{j\sigma}+U\sum_{i} n_{i\uparrow}n_{i\downarrow}
$$

包括了准粒子激发的能量以及自旋-自旋相互作用大小U.



# Bethe ansatz

Bethe ansatz指的是假设有相互作用的Hubbard model中的自选向上向下的电子仍然可以拆分为两种平面波来计算。
实际上这和自旋波的计算是完全等价的，这我们将在下一节中证明这一点。不过相比自旋波，这里看起来更加让人眼花缭乱。
首先我们可以定义交换算符，在自旋轨道的二次量子化下，这样定义的交换算符为

$$
P(i,j)=1-(c_i^\dagger-c_j^\dagger)(c_i-c_j),
$$

满足关系式子：

$$
P_{i,j}c_i=c_jP_{i,j}.
$$

对于交换的路径进行研究，我们可以得到

$$
U_n=P_{n,n-1}P_{n-1,n-2}\dots P_{3.2}P_{2,1}
$$

我们想要定义的是用用交换算符定义Hubbard Model.做到这一点，用自旋算符来定义是合适的，因为升降算符可以写为:

$$
S^+=\sum_{j=1}^{L}c_{j,\uparrow}^\dagger c_{j,\downarrow}, S^- = \sum_{j=1}^{L}c_{j_\downarrow}^\dagger c_{j,\uparrow}
$$

对于奇数个格点的算符定义Shiba变换:

$$
J_a^{(sh)}=(c_{L,a}^\dagger-c_{L,a})(c_{L-1,a}^\dagger+c_{L-1,a})\dots(c_{2,a}^\dagger-c_{2,a})(c_{1,a}^\dagger+c_{1,a})
$$

这个算符将所有自旋为a的粒子换成一个空穴。然后也可以定义

$$
\begin{aligned}
J_\downarrow^{(sh)}S^+(J_\downarrow^{(sh)})^\dagger=\sum_{j=1}^{L}(-1)^jc_{j,\uparrow}^\dagger c_{j,\downarrow}^\dagger=-\eta^+\\
    J_\downarrow^{(sh)}S^-(J_\downarrow^{(sh)})^\dagger=\sum_{j=1}^{L}(-1)^jc_{j,\uparrow}^\dagger c_{j,\downarrow}^\dagger=-\eta^-\\
\end{aligned}
$$

当然这些算符也满足Lie group:$[\eta^+,\eta^-]=2\eta^z$

# Bethe Ansatz method and Lieb-Wu equations

之前我们说过，Hubbard模型可以用Bethe拟设严格求解。求解这个方程意味着我们就是在计算一系列
行波在散射之后相位所规定的本征值。

# The problem in first quantilization

我们依然是选择寻找薛定谔方程的解：

$$
H|\psi\rangle=E|\psi\rangle.
$$

我们也想去求解升降算符的本征值问题。因为propagator$U$与哈密顿量对易$[U,H]=0$所以我们能找U和H的
共同本征值$U|\psi\rangle=\omega|\psi\rangle$。在二次量子化的形式下，量子态表示为：

$$
|\psi\rangle=\frac{1}{N!}\sum_{x_1\dots x_N}^{L}\sum_{a_1\dots a_N=\uparrow,\downarrow}\psi|x,a\rangle
$$

知道了这个，薛定谔方程应当写为：

$$
\begin{aligned}
H|x,a\rangle&=(-\sum_{j=1}^{L}\sum_{a=\uparrow,\downarrow}(c_{j,a}^\dagger c_{j+1.a}+c_{j+1,a}^\dagger c_{j,a})+4u\sum_{j=1}^{L}n_{j\uparrow}n_{j\downarrow})|x,a\rangle\\
    &=-\sum_{j=1}^{N}(|x-1,a\rangle+|x+1,a\rangle)+4u\sum_{1\leq k<l\leq N}\delta_{x_k,x_l}|x,a\rangle
\end{aligned}
$$

这里由于Pauli不相容原理，假如两个态占据一个格点，那么一定一个向上一个向下，所以就不用管什么了。
然后对于这个$U$的本征态我们是知道的对吧，由熟悉的布洛赫定理，在自由空间中的传播一定可以写为幺正变换的形式。那么我们只需要处理这个相互作用的效应就可以了。

# 二体问题

考虑双占据体系，离子状态为$\psi(x_1,x_2;a_1,a_2)$，方程写为:

$$
H_2=-(\Delta_1^++\Delta_1^-+\Delta_2^++\Delta_2^-)+4u\delta_{x_1,x_2}
$$

其中$\Delta_1^+\psi=\psi(x_1+1,\dots)$,以此类推。假设$n=x_1-x_2,m=x_1+x_2$代入薛定谔方程可以得到：

$$
(f(m+1)+f(m-1))(g(n+1)+g(n-1))=(4u\delta_{n,0}-E)g(n)f(m)
$$

根据Bethe拟设，f,g都是平面波的形式，只是g在散射之后会多一个相位差$\theta$。我们直接写成振幅的形式:

$$
g(n)=\begin{cases}
        A^{-+}z^{n}-A^{--}z^{-n}&\text{if }n<0\\
        A^{++}z^{n}-A^{+-}z^{-n}&\text{if }n>0
    \end{cases}
$$

当n=0时，一方面要求g连续，另一方面满足薛定谔方程。利用Bethe拟设，这里$z=e^{i(k_1-k_2)/2},w=e^{i(k_1+k_2)/2},f=w^n$这样我们可以得到:

$$
(\sin(k_1)-\sin(k_2))(A^{+-}+A^{++}-A^{-+}-A^{--})=4iu(A^{-+}-A^{--}).
$$

这是一个二体量子态所满足的方程，作为二元方程自由度当然是不够的。对于电子来说，一定满足交换反对称性$g(n)=-\Pi g(-n)$，即：

$$
A^{-+}=\Pi A^{+-},A^{++}=\Pi A^{--}
$$

所有的波函数现在就可以用统一的振幅表示，再加上f的表达式我们就可以得到：

$$
\psi(x_1,x_2)=\begin{cases} 
        A^{-+} e^{i(k_1 x_1 + k_2 x_2)} - Y(s_1 - s_2) A^{-+} e^{i(k_1 x_2 + k_2 x_1)} & \text{if } x_1 \leq x_2 \\
        Y(s_1 - s_2) \Pi A^{-+} e^{i(k_1 x_1 + k_2 x_2)} - \Pi A^{-+} e^{i(k_1 x_2 + k_2 x_1)} & \text{if } x_1 \geq x_2 
        \end{cases}
$$

其能量大小为$E=-2cosk_1-2cosk_2$，那么我们怎么求解波的振幅$A^{-+}$呢？其实是singlet和triplet的
波函数$\phi_{sing},\phi_{trip}$的线性组合。

$$
\phi_{sing}(a_1,a_2)=\delta_{a_1,\uparrow},\delta_{a_2,\downarrow}-\delta_{a_1,\downarrow}\delta_{a_2,\uparrow}
$$

$$
\phi_{trip}=\begin{cases}
        \delta_{a_1,\uparrow},\delta_{a_2,\uparrow}\\
        \delta_{a_1,\uparrow},\delta_{a_2,\downarrow}+\delta_{a_1,\downarrow}\delta_{a_2,\uparrow}\\
        \delta_{a_1,\downarrow},\delta_{a_2,\downarrow}
    \end{cases}
$$

以及有宇称算符$\Pi$可以将$\phi_{sing}$变为$-\phi_{sing}$，三重态则保持不变。这样的话我们就知道对于单重态解是比较正常的

$$
\psi(x_1, x_2) = 
\begin{cases} 
A^{-+} e^{i(k_1 x_1 + k_2 x_2)} - Y(s_1 - s_2) A^{-+} e^{i(k_1 x_2 + k_2 x_1)} & \text{if } x_1 \leq x_2 \\
Y(s_1 - s_2) \Pi A^{-+} e^{i(k_1 x_1 + k_2 x_2)} - \Pi A^{-+} e^{i(k_1 x_2 + k_2 x_1)} & \text{if } x_1 \geq x_2 
\end{cases}
$$

# 从边界条件到Lieb-Wu方程

至少到目前为止，我们已经成功的得出了Hubbard Model 在运用Bethe ansatz之后得到的单重态和三重态的解了，看起来就是两个粒子的散射。 
代入循环边界条件:

$$
\begin{aligned}
\psi(0,x_2;a)=\psi(L,x_2;a), \psi(L+1,x_2;a)=\psi(1,x_2;a)
\end{aligned}
$$

再代入前面得到的平面波的表达式，我们就可以看出：

$$
\begin{aligned}
e^{ik_1L}=\frac{s_1-s_2+2iu}{s_1-s_2-2iu}, e^{ik_2L}=\frac{s_2-s_1+2iu}{s_2-s_1-2iu}.\text{(singlet)}\\
    e^{ik_1L}=1,e^{ik_2L}=1\text{(triplet)}
\end{aligned}
$$

考虑N=2的triplet,当E=0或E=4U时存在非平庸的解，$f(m)=(\pm i)^m$。
这看起来很奇怪:这是一个束缚态，即使粒子之间的相互作用是排斥的。(好吧其实也挺正常的,像Anderson局域化)
Bethe拟设下，量子态由两组参量表示：$k_j,\lambda_j$，分别是动量和快度。这样的话Bethe ansatz 波函数为:

$$
\begin{aligned}
\psi(x;a|k;\lambda)=
    \langle aQ|kP,\lambda\rangle=\sum_{P\in \mathfrak{S}}A(\lambda R)\prod_{l=1}^MF_{kP}(\lambda_R;y_l)\\
    F_k(\lambda;y)=\frac{2iu}{\lambda-\sin(k_y)+iu}\prod_{j=1}^{y-1}\frac{\lambda-\sin(k_j)-iu}{\lambda-\sin(k_j)+iu}\\
    A(\lambda)=\prod_{a\leq m<n\leq M}\frac{\lambda_m-\lambda_n-iu}{\lambda_m-\lambda_n}
\end{aligned}
$$

推而广之，考虑半填充的基态$N_\uparrow=N_\downarrow=L/2$这时我们想要的周期性边界条件
应当是:

$$
L_{k_j}=2\pi I_j+\sum_{\alpha=1}^{L/2}2\arctan(\frac{2U}{4t}\cot(\frac{k_j-\Lambda_\alpha}{2}))
$$

$$
F_{\boldsymbol{k}}(\lambda; y) = \frac{2iu}{\lambda - \sin k_y + iu} \prod_{j=1}^{y-1} \frac{\lambda - \sin k_j - iu}{\lambda - \sin k_j + iu}
$$

$$
A(\boldsymbol{\lambda}) = \prod_{1 \leq m < n \leq M} \frac{\lambda_m - \lambda_n - 2iu}{\lambda_m - \lambda_n}
$$

# $k-\lambda$链和$\lambda$链

我们现在开始真正寻找方程的解。首先我们假设L非常大，然后$k_j$是一个不为0的复数。
