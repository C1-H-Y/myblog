---
title: Bethe Ansatz方法求解一维海森堡自旋链模型
categories:
  - condensed matter
--- 

一维可积自旋链模型是统计物理和凝聚态物理中少数可以严格求解的强关联多体量子系统，Bethe Ansatz（贝特拟设）是构造这类系统精确解的核心方法。本节以反铁磁XXX海森堡自旋链为例，从双磁子散射开始，完整推导Bethe Ansatz解，介绍其核心物理性质。

# 海森堡XXX自旋链哈密顿量

我们考虑周期性边界条件下长度为$L$的一维自旋1/2链，最近邻海森堡交换相互作用的哈密顿量为：

$$
H = J \sum_{n=1}^{L} \boxed{S}_n \cdot \boxed{S}_{n+1}, \quad \boxed{S}_{L+1} = \boxed{S}_1
$$

其中$J>0$对应反铁磁相互作用，$J<0$对应铁磁相互作用，$\boxed{S}_n = (\sigma_n^x/2, \sigma_n^y/2, \sigma_n^z/2)$是第$n$个格点的自旋1/2算符，$\sigma^\alpha$为泡利矩阵。利用升降自旋算符$S_n^\pm = S_n^x \pm i S_n^y$，哈密顿量可以改写为：

$$
H = \frac{JL}{4} + J \sum_{n=1}^L \left( S_n^+ S_{n+1}^- + S_n^- S_{n+1}^+ + S_n^z S_{n+1}^z - \frac{1}{4} \right)
$$

铁磁参考态为所有自旋向上的态$|F\rangle = |\uparrow\uparrow\cdots\uparrow\rangle$，能量为$E_0 = \frac{JL}{4}$。所有低能激发对应$M$个自旋向下的翻转（磁子），我们需要在$M$个磁子的子空间中构造哈密顿量的本征态。

# 双磁子散射振幅的详细推导

我们首先研究双磁子$(M=2)$情况，推导两体散射振幅，验证其幺正性。

### 双磁子子空间的薛定谔方程

双磁子态可以表示为$|x_1, x_2\rangle = S_{x_1}^- S_{x_2}^- |F\rangle$，满足$x_1 < x_2$，本征态可以展开为：

$$
|\psi\rangle = \sum_{1 \leq x_1 < x_2 \leq L} \psi(x_1, x_2) |x_1, x_2\rangle
$$

代入薛定谔方程$H|\psi\rangle = E|\psi\rangle$，令能量增量$\Lambda = E - E_0$，我们分两种情况得到坐标空间方程：
1.  **非邻磁子**$x_2 > x_1+1$，两个磁子不会发生位置交换，方程为：

$$
\Lambda \psi(x_1, x_2) = J\left[ \psi(x_1+1, x_2) + \psi(x_1-1, x_2) + \psi(x_1, x_2+1) + \psi(x_1, x_2-1) - 4\psi(x_1, x_2) \right]
$$

2.  **相邻磁子**$x_2 = x_1+1$，升降算符会改变磁子位置，对角能量项修正后方程为：

$$
(\Lambda - J) \psi(x_1, x_1+1) = J\left[ \psi(x_1-1, x_1+1) + \psi(x_1, x_1+2) \right]
$$

Bethe Ansatz假设双磁子波函数为两个平面波排列的线性组合：

$$
\psi(x_1, x_2) = A(k_1,k_2) e^{i(k_1 x_1 + k_2 x_2)} + A(k_2,k_1) e^{i(k_2 x_1 + k_1 x_2)}, \quad x_1 < x_2
$$

我们需要求解散射振幅比值$S(k_1,k_2) = \frac{A(k_2,k_1)}{A(k_1,k_2)}$。

### 散射振幅化简与幺正性验证

对于非邻情况，容易验证任意平面波分量$e^{i(k_1 x_1 + k_2 x_2)}$满足方程，只要能量增量为：

$$
\Lambda = J(1-\cos k_1) + J(1-\cos k_2)
$$

所有约束都来自相邻磁子的匹配条件。将波函数代入相邻条件，约去公共因子后得到齐次方程：

$$
(1 - \cos k_1 - \cos k_2)\left(A e^{ik_2} + A' e^{ik_1}\right) = A\left(e^{ik_2 - ik_1} + e^{2ik_2}\right) + A'\left(e^{ik_1 - ik_2} + e^{2ik_1}\right)
$$

利用三角恒等式$\cos\theta = \frac{e^{i\theta} + e^{-i\theta}}{2}$整理后，我们得到散射振幅：

$$
S(k_1,k_2) = \frac{\sin\left(\frac{k_1 - k_2}{2} - i \frac{c}{2}\right)}{\sin\left(\frac{k_1 - k_2}{2} + i \frac{c}{2}\right)}
$$

其中$c=1$对应XXX模型，我们可以立即验证模长幺正性：

$$
|S(k_1,k_2)| = \frac{|\sin\left(\frac{k_1 - k_2}{2} - i/2\right)|}{|\sin\left(\frac{k_1 - k_2}{2} + i/2\right)|} = \frac{\sqrt{\sin^2\left(\frac{k_1 - k_2}{2}\right) + \frac{1}{4}\cos^2\left(\frac{k_1 - k_2}{2}\right)}}{\sqrt{\sin^2\left(\frac{k_1 - k_2}{2}\right) + \frac{1}{4}\cos^2\left(\frac{k_1 - k_2}{2}\right)}} = 1
$$

完美满足散射理论的概率守恒要求。我们也可以将散射振幅写为纯相位形式：

$$
S(k_1,k_2) = - e^{-2i \theta(k_1 - k_2)}, \quad \theta(k) = \arctan\left( \frac{2\sin \frac{k}{2}}{c} \right)
$$

明确显示散射过程只有相位移动，不改变动量，这是可积系统的核心特征。

### 多体Bethe Ansatz的构造

我们现在将双磁子结果推广到$M$个磁子的一般情况，构造完整的Bethe Ansatz解。

对于$M$个有序格点$1 \leq x_1 < x_2 < \dots < x_M \leq L$，Bethe Ansatz假设本征波函数为所有动量排列的平面波叠加：

$$
\boxed{
\psi(x_1,x_2,\dots,x_M) = \sum_{P \in S_M} A(P) \exp\left( i \sum_{j=1}^M k_{P_j} x_j \right)
}
$$

其中$S_M$是$M$个元素的所有排列，振幅由两体散射因子乘积给出，反映了可积系统散射的因子化性质：任意多体散射都可以分解为一系列两两独立的两体散射：

$$
A(P) = C \prod_{1 \leq i < j \leq M} S(k_{P_i}, k_{P_j})
$$

这里$C$是整体归一化常数，交换两个动量就会引入一次两体散射相位，乘积自动积累所有散射贡献。

周期边界条件要求波函数平移$L$后保持不变：当一个动量为$k_j$的磁子绕链一周，会和其余$M-1$个磁子各发生一次散射，总相位必须等于$2\pi$整数倍，因此我们得到：

$$
e^{i k_j L} = \prod_{l \neq j}^M (-S(k_j, k_l)) = (-1)^{M-1} \prod_{l \neq j}^M \frac{\sin\left( \frac{k_j - k_l - i}{2} \right)}{\sin\left( \frac{k_j - k_l + i}{2} \right)}, \quad j=1,2,\dots,M
$$

这就是著名的**海森堡XXX模型Bethe Ansatz方程**。对两边取对数可以得到更直观的形式：

$$
L k_j = 2\pi I_j + \sum_{l \neq j}^M 2\theta(k_j - k_l), \quad I_j \in \begin{cases}
\mathbb{Z}, & M \text{ 为奇数} \\
\mathbb{Z} + 1/2, & M \text{ 为偶数}
\end{cases}
$$

其中$I_j$称为Bethe根的量子数，每个量子数唯一对应一个动量解$k_j$。

系统本征能量和总动量可以直接由单个磁子的贡献相加得到，因为散射不改变单个磁子的能量动量：

$$
E = E_0 + J \sum_{j=1}^M (1 - \cos k_j), \quad P = \sum_{j=1}^M k_j
$$

其中$E_0 = JL/4$是铁磁参考态能量。

当系统尺寸$L \to \infty$，磁子数密度$\rho = M/L$保持有限，离散的Bethe根会形成连续分布，我们可以将Bethe Ansatz方程转化为积分方程。

基态对应所有量子数$I_j$连续填充在原点周围区间$[-Q, Q]$，分布密度函数$\rho(k)$定义为单位动量区间内的Bethe根数目，Bethe方程取连续极限后得到：

$$
2\pi \rho(k) + \int_{-Q}^Q \frac{2 c}{c^2 + (k - k')^2} \rho(k') dk' = 1
$$

其中$c=1$对应XXX模型，$Q$是费米截断，满足总数条件：

$$
\int_{-Q}^Q \rho(k) dk = \frac{M}{L}
$$

基态能量密度为：

$$
e = \frac{E}{L} = \frac{J}{4} + J \int_{-Q}^Q (1-\cos k) \rho(k) dk
$$

对于反铁磁XXX模型，零外场下$M = L/2$，可以精确解出基态能量密度：

$$
e_0 = \frac{J}{4} - J \ln 2 \approx -0.443 J
$$

和数值对角化结果完全一致。

有限温度下，系统处于统计平衡，Bethe根满足费米-狄拉克分布，我们可以得到热力学Bethe Ansatz(TBA)方程：

$$
\varepsilon(k) - T \int_{-\infty}^{\infty} \frac{c}{\pi (c^2 + (k - k')^2)} \ln\left( 1 + e^{-\varepsilon(k')/T} \right) dk' = J \cos k - h
$$

其中$h$是外磁场，$\varepsilon(k)$是磁子的准能，自由能密度为：

$$
f = \frac{J}{4} - h \frac{1}{2} - T \int_{-\infty}^{\infty} \ln\left(1 + e^{-\varepsilon(k)/T}\right) \rho(k) dk
$$

从TBA方程可以严格计算出任意温度和外场下的比热、磁化率、熵等所有热力学量，结果和低温自旋波理论、高温展开一致。

基态之上的激发分为两类：
1.  **粒子-空穴激发**：对应将一个Bethe根从费米海内移动到费米海外，产生自旋1/2的激发，色散关系在低能下是线性的，对应自旋波，速度为$v_s = \pi J/2$；
2.  **弦解**：对应多个磁子形成的束缚态，描述自旋大于1/2的激发，弦解的存在表明反铁磁XXX自旋链的能谱是完全的，所有激发都是稳定的准粒子。

Bethe Ansatz不仅仅是构造精确解的数学方法，它揭示了一维可积多体系统的核心物理性质：

- 可积系统中所有多体散射都可以分解为两两独立的两体散射，散射过程只有纯相位移动，不改变准粒子的动量和能量，因此所有激发都是稳定的；
- 散射振幅满足幺正性$|S|=1$，符合概率守恒，保证了Bethe Ansatz解的正交归一性；
- Bethe Ansatz将复杂的多体本征值问题约化为一组有限的非线性代数方程，可以通过热力学极限转化为积分方程严格求解，得到所有热力学和动力学性质；
- 基于Bethe Ansatz发展出的坐标空间Bethe Ansatz、代数Bethe Ansatz、热力学Bethe Ansatz已经成为研究一维强关联系统的标准工具，在量子可积性、凝聚态物理、高能物理、量子信息中都有广泛应用。
